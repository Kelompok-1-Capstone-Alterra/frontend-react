import { Eye20Regular, Dismiss20Filled } from "@fluentui/react-icons";
import Table from "../components/Table";
import useSWR from "swr";
import { useState } from "react";
import PaginationButton from "../components/PaginationButton";
import MainContainer from "../components/layouts/MainContainer";
import gambar from "../assets/support.png";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Suggestion() {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/admins/suggestions`;
  const { data, isLoading } = useSWR(url, () =>
    fetcher(url, Cookies.get("token"))
  );
  const ITEMS_PER_PAGE = 8;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState({ currentPage: 1 });
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { currentPage } = filter;
  const support = data;

  let filteredSupport = Array.isArray(support) ? support : [];

  if (startDate && endDate && Array.isArray(filteredSupport)) {
    filteredSupport = filteredSupport.filter((value) => {
      const supportDate = new Date(value.date);
      return supportDate >= startDate && supportDate <= endDate;
    });
  } else {
    filteredSupport = [];
  }

  const totalPages = Math.ceil(filteredSupport?.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      currentPage: page,
    });
  };

  const openModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
    navigate(`/auth/admins/suggestions/${data.suggestion_id}`);
  };

  const handleStartDateChange = (e) => {
    const startDateValue = e.target.value ? new Date(e.target.value) : null;
    setStartDate(startDateValue);
  };

  const handleEndDateChange = (e) => {
    const endDateValue = e.target.value ? new Date(e.target.value) : null;
    setEndDate(endDateValue);
  };

  console.log(support);

  return (
    <MainContainer>
      <h4 className="text-h-4 font-bold">Masukan & Saran</h4>
      <div className="mt-[20px] flex">
        <div className="mr-[10px]">
          <input
            type="date"
            className="border border-gray-500 pl-[10px] rounded-md px-2 py-1"
            onChange={handleStartDateChange}
            id="start-date"
          />
        </div>
        <p>-</p>
        <div className="ml-[10px]">
          <input
            type="date"
            className="border border-gray-500 pl-[10px] rounded-md px-2 py-1"
            onChange={handleEndDateChange}
            id="end-date"
          />
        </div>
      </div>
      <div className="w-full">
        <div>
          {isLoading ? (
            <Loading />
          ) : filteredSupport?.length <= 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <img
                src={gambar}
                className=""
                alt="Error 400"
              />
              <p className="text-center text-body-lg mt-2 text-neutral-40">
                Belum ada data masukan & saran
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                headers={["Tanggal", "User ID", "Deskripsi", "Aksi"]}
                className={
                  "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
                }
              >
                {filteredSupport?.map((value, index) => {
                  const kata = value.deskripsi.split(" ");
                  const maxKata = kata.slice(0, 15).join(" ");
                  const Desc = kata.length > 15 ? maxKata + "..." : maxKata;
                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                    >
                      <td className="text-caption-lg pt-[17.5px] pb-[17.5px]">
                        {new Date(value.date).toLocaleDateString("id-ID")}
                      </td>
                      <td className="text-caption-lg">{value.id}</td>
                      <td className="text-caption-lg w-[674px] text-left">
                        {Desc}
                      </td>
                      <td>
                        <div className="flex gap-3 justify-center">
                          <Eye20Regular
                            className="cursor-pointer hover:text-info"
                            id={`detail-suggestion-${value.id}`}
                            onClick={() => openModal(value)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </Table>
              <div className="flex w-full justify-center mt-5">
                <PaginationButton
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  totalPages={filteredSupport?.length > 0 ? totalPages : 1}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedData && showModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="border bg-neutral-10 w-[895px] rounded-[10px] p-[32px] shadow-elevation-2 border-1 top-1/2 left-1/2">
              <div className="flex justify-between mb-[10px]">
                <p className="font-bold">Masukan Dan Saran</p>
                <Dismiss20Filled
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer hover:text-info"
                  id="close-modal"
                />
              </div>
              <div className="flex">
                <div className="">
                  <div className="flex flex-col items-center">
                    {selectedData.image ? (
                      <img
                        src={selectedData.image}
                        alt=""
                        className="w-[105px] h-[101px] rounded-full mb-[10px]"
                      />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-primary  rounded-full w-[105px] h-[101px] mb-[10px]">
                          <p className="text-h-3 text-white">
                            {selectedData.name.charAt(0)}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="text-center">
                      <p>{selectedData.name}</p>
                      <p>{selectedData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-[32px]">
                  <label className="font-bold mt-[15px]">Tanggal</label>
                  <p className="mt-[5px] mb-[10px]">{selectedData.date}</p>
                  <label className="font-bold">Deskripsi</label>
                  <p className="max-w-[600px] overflow-hidden overflow-ellipsis">
                    {selectedData.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          showModal ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>
    </MainContainer>
  );
}
