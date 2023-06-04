import Button from "../components/Button";
import {
  Add20Regular,
  Edit20Regular,
  Eye20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";
import Table from "../components/Table";
import { ConfirmModal, NotifModal } from "../components/Modal";
import PaginationButton from "../components/PaginationButton";

export default function ArticlePage() {
  const [artikelList, setArtikelList] = useState([]);
  const [filteredList, setFilteredList] = useState(artikelList);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [modalDelete, setModalDelete] = useState(false);
  const total_item = 8;

  // search
  let filterArtikel = artikelList;

  filterArtikel = filterArtikel.filter((value) =>
    value.name.toLowerCase().includes(filteredList)
  );

  const startIndex = (currentPage - 1) * total_item;
  const endIndex = currentPage * total_item;
  filterArtikel = filterArtikel.slice(startIndex, endIndex);

  const totalPages = Math.ceil(artikelList.length / total_item);

  useEffect(() => {
    axios
      .get("https://647348bad784bccb4a3c6bcf.mockapi.io/products")
      .then((response) => {
        setArtikelList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    setModalDelete(false);
    axios
      .delete(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
      .then(() => {
        const updatedArtikelList = artikelList.filter(
          (product) => product.id !== id
        );
        setArtikelList(updatedArtikelList);
        setShowModal({
          show: true,
          icon: "success",
          text: "Artikel Telah Berhasil Dihapus",
          title: "Hapus Artikel",
        });
      })
      .catch((error) => {
        console.log(error);
        setShowModal({
          show: true,
          icon: "info",
          text: "Artikel Gagal Dihapus",
          title: "Hapus Artikel",
        });
      });
  };

  return (
    <MainContainer>
      {/* title */}
      <h4 className="text-h-4 font-bold">Artikel</h4>
      <div className="flex w-full justify-end my-4">
        <Link
          to="/admin/articles/create"
          className=""
        >
          <Button
            size="md"
            id="add-article"
          >
            <Add20Regular className="mr-2" />
            Tambah
          </Button>
        </Link>
      </div>

      {/* search */}
      <div className="">
        <div className="relative mb-3 flex w-full items-stretch">
          <TextField
            id="search-article"
            label=""
            variant="search"
            type="search"
            onChange={(event) => setFilteredList(event.target.value)}
          ></TextField>
        </div>
      </div>

      {/* Modal */}
      {modalDelete && (
        <ConfirmModal
          icon={"info"}
          title={"Hapus Artikel"}
          text={"Apakah Anda yakin ingin menghapus artikel ini?"}
          cancelText={"Kembali"}
          confirmText={"Hapus"}
          onConfirm={() => handleDelete(modalDelete)}
          onCancel={() => setModalDelete(null)}
          isOpen={modalDelete ? true : false}
        />
      )}

      {/* Table */}

      <div className="w-full">
        <div className="overflow-x-auto">
          <Table
            headers={["Header", "Judul Artikel", "Viewers", "Aksi"]}
            className={
              "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
            }
          >
            {filterArtikel.map((artikel, index) => (
              <tr
                key={index}
                className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
              >
                <td className="flex justify-center">
                  <img
                    src={artikel.image}
                    className="w-[56px] h-[48px]"
                    alt="Avatar Tailwind CSS Component"
                  />
                </td>
                <td className="text-caption-lg">{artikel.name}</td>
                <td className="text-caption-lg">Otto</td>
                <td>
                  <div className="flex gap-3 justify-center">
                    <Link to={`/admin/articles/${artikel.id}`}>
                      <Eye20Regular
                        className="cursor-pointer hover:text-info"
                        id="detail-article"
                      />
                    </Link>
                    <Delete20Regular
                      className="cursor-pointer hover:text-info"
                      onClick={() => setModalDelete(artikel.id)}
                      id="delete-article"
                    />
                    <Link to={`/admin/articles/update/${artikel.id}`}>
                      <Edit20Regular
                        className="cursor-pointer hover:text-info"
                        id="update-article"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
          <div className="flex w-full justify-center mt-5">
            <PaginationButton
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
      <NotifModal
        title={showModal.title}
        text={showModal.text}
        icon={showModal.icon}
        confirmText={"Tutup"}
        isOpen={showModal.show}
        onConfirm={() => {
          setShowModal({
            show: false,
            icon: "",
            text: "",
            title: "",
          });
        }}
      />
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          showModal.show || modalDelete ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>
    </MainContainer>
  );
}
