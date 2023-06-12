import { Eye20Regular } from "@fluentui/react-icons";
import Table from "../components/Table";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";
import PaginationButton from "../components/PaginationButton";
import MainContainer from "../components/layouts/MainContainer";
import { NotifModal } from "../components/Modal";


const ITEMS_PER_PAGE = 8;

export default function Support() {
  const url = "https://647348bad784bccb4a3c6bcf.mockapi.io/help";
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(url, fetcher);
  const [filter, setFilter] = useState({currentPage: 1})
  const [showModal, setShowModal] = useState({show: false,
    date: "",
    deskripsi: ""})
  const { currentPage} = filter;
  const support = data;
  let filteredSupport = support;

  
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


  const openModal = (date, deskripsi) => {
    setShowModal({
      show: true,
      date,
      deskripsi
    });
  };

  const closeModal = () => {
    setShowModal({
      show: false,
      date: "",
      deskripsi: ""
    });
  };

  return (
  
    <MainContainer>
      {/* title */}
      <h4 className="text-h-4 font-bold">Masukan & Saran</h4>
      <div className="w-full">
        <div>
          {filteredSupport?.length <= 0 ? (
            <p className="text-center">Tidak ada artikel</p>
          ) : (
            <div className="overflow-x-auto">
              <Table
                headers={["Tanggal", "User ID", "Deskripsi", "Aksi"]}
                className={
                  "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
                }
              >
                {filteredSupport?.map((value, index) => (
                  <tr
                    key={index}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td className="text-caption-lg pt-[17.5px] pb-[17.5px]">
                      {value.date}
                    </td>
                    <td className="text-caption-lg">  
                      {value.id}
                    </td>
                    <td className="text-caption-lg">
                      {value.deskripsi}
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center">
                          <Eye20Regular
                            className="cursor-pointer hover:text-info"
                            id="detail-article"
                            onClick={() => openModal(value.date, value.deskripsi)}
                            />
                      </div>
                    </td>
                  </tr>
                ))}
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
      {showModal.show && (
        <NotifModal
          title={showModal.date}
          text={showModal.deskripsi}
          confirmText={"Tutup"}
          isOpen={showModal.show}
          onConfirm={closeModal}
        />
      )}
      </MainContainer>
  );
}
