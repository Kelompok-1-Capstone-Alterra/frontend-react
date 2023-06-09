import { Eye20Regular, Dismiss20Filled } from "@fluentui/react-icons";
import Table from "../../components/Table";
import useSWR from "swr";
import { useState } from "react";
import PaginationButton from "../../components/PaginationButton";
import MainContainer from "../../components/layouts/MainContainer";
import gambar from "../../assets/img/suggestions/EmptySuggestion.png";
import Cookies from "js-cookie";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import { motion } from "framer-motion";

const renderAvatarPlaceHolder = (name) => {
  return (
    <div className="avatar placeholder">
      <div className="bg-primary  rounded-full w-[105px] h-[101px] mb-[10px]">
        <p className="text-h-3 text-white">{name.charAt(0).toUpperCase()}</p>
      </div>
    </div>
  );
};

export default function Suggestion() {
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
  const support = data?.data;

  if (!data) return null;

  let filteredSupport = Array.isArray(support) ? support : [];

  if (startDate && endDate && Array.isArray(filteredSupport)) {
    filteredSupport = filteredSupport.filter((value) => {
      const supportDate = new Date(value.post_at).setUTCHours(0, 0, 0, 0);
      const startDateTime = new Date(startDate).setUTCHours(0, 0, 0, 0);
      const endDateTime = new Date(endDate).setUTCHours(0, 0, 0, 0);

      return supportDate >= startDateTime && supportDate <= endDateTime;
    });
  }

  const totalPages = Math.ceil(filteredSupport.length / ITEMS_PER_PAGE);
  filteredSupport = filteredSupport?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
    const startDateValue = e.target.value ? new Date(e.target.value) : null;
    setStartDate(startDateValue);
  };

  const handleEndDateChange = (e) => {
    const endDateValue = e.target.value ? new Date(e.target.value) : null;
    setEndDate(endDateValue);
  };

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
              <img src={gambar} />
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
                  const kata = value.message.split(" ");
                  const maxKata = kata.slice(0, 15).join(" ");
                  const Desc = kata.length > 15 ? maxKata + "..." : maxKata;
                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                    >
                      <td className="text-caption-lg pt-[17.5px] pb-[17.5px]">
                        {new Date(value.post_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="text-caption-lg">{value.user_id}</td>
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
        <motion.div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            className="border bg-neutral-10 w-[895px] rounded-[10px] p-[32px] shadow-elevation-2 border-1 top-1/2 left-1/2"
            initial={{ opacity: 0, y: +70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
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
                  {selectedData.picture ? (
                    <div className="w-[105px] h-[101px] rounded-full mb-[10px]">
                      <ImageWithSkeleton
                        src={`${import.meta.env.VITE_API_BASE_URL}/pictures/${
                          selectedData.picture
                        }`}
                        alt=""
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    renderAvatarPlaceHolder(selectedData.name)
                  )}
                  <div className="text-center">
                    <p>{selectedData.name}</p>
                    <p>{selectedData.email}</p>
                  </div>
                </div>
              </div>
              <div className="ml-[32px]">
                <label className="font-bold">Tanggal</label>
                <p>
                  {new Date(selectedData.post_at).toLocaleDateString("id-ID")}
                </p>
                <label className="font-bold">Deskripsi</label>
                <p>{selectedData.message}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          showModal ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>
    </MainContainer>
  );
}
