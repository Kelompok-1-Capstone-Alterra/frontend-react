import { Eye20Regular } from "@fluentui/react-icons";
import Table from "../components/Table";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import PaginationButton from "../components/PaginationButton";
import MainContainer from "../components/layouts/MainContainer";
import gambar from "../assets/Logo.png";

const ITEMS_PER_PAGE = 8;

export default function Support() {
  const url = "https://647348bad784bccb4a3c6bcf.mockapi.io/help";
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(url, fetcher);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilter] = useState({ currentPage: 1 });
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { currentPage } = filter;
  const support = data;

  let filteredSupport = support;
  filteredSupport = filteredSupport?.filter((value) => {
    const supportDate = new Date(value.date);
    return (
      supportDate >= startDate && supportDate <= endDate
    );
  });

  const totalPages = Math.ceil(filteredSupport?.length / ITEMS_PER_PAGE);

  filteredSupport = filteredSupport?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      currentPage: page,
    });
  };

  const openModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const handleStartDateChange = (e) => {
    const startDateValue = new Date(e.target.value);
    setStartDate(startDateValue);
  };

  const handleEndDateChange = (e) => {
    const endDateValue = new Date(e.target.value);
    setEndDate(endDateValue);
  };

  return (
    <MainContainer>
      {/* title */}
      <h4 className="text-h-4 font-bold">Masukan & Saran</h4>
      <div className="mt-[20px] flex">
        <div className="mr-[10px]">
          <input type="date" className="border border-gray-500 pl-[10px] rounded-md" onChange={handleStartDateChange} />
        </div>
        <p>-</p>
        <div className="ml-[10px]">
          <input type="date" className="border border-gray-500 pl-[10px] rounded-md" onChange={handleEndDateChange}  />
        </div>
      </div>
      <div className="w-full">
        <div>
          {filteredSupport?.length <= 0 ? (
            <p className="text-center">Tidak Ada Masukan</p>
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
                  const Desc =kata.length > 15 ? maxKata+ "..." : maxKata;
                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                    >
                      <td className="text-caption-lg pt-[17.5px] pb-[17.5px]">
                        {value.date}
                      </td>
                      <td className="text-caption-lg">{value.id}</td>
                      <td className="text-caption-lg text-left max-w-[642px]">
                        {Desc}
                      </td>
                      <td>
                        <div className="flex gap-3 justify-center">
                          <Eye20Regular
                            className="cursor-pointer hover:text-info"
                            id="modal-support"
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
                <button onClick={() => setShowModal(false)}>X</button>
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
    </MainContainer>
  );
}
