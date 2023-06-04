import Button from "../components/Button";
import {
  Add20Regular,
  Edit24Regular,
  Eye24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";
import Table from "../components/Table";
import { ConfirmModal, NotifModal } from "../components/Modal";
import PaginationButton from "../components/PaginationButton";

export default function Article() {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState(productList);
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
  let filterProduct = productList;

  filterProduct = filterProduct.filter((value) =>
    value.name.toLowerCase().includes(filteredList)
  );

  const startIndex = (currentPage - 1) * total_item;
  const endIndex = currentPage * total_item;
  filterProduct = filterProduct.slice(startIndex, endIndex);

  const totalPages = Math.ceil(productList.length / total_item);

  useEffect(() => {
    axios
      .get("https://647348bad784bccb4a3c6bcf.mockapi.io/products")
      .then((response) => {
        setProductList(response.data);
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
      .then((response) => {
        const updatedProductList = productList.filter(
          (product) => product.id !== id
        );
        setProductList(updatedProductList);
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
    <>
      <MainContainer />
      {/* title */}
      <div className="ml-[30px] flex">
        <h4 className="text-h-4 font-bold mt-4">Artikel</h4>
        <Link to="/admin/articles/create" className="pl-[1000px]">
          <Button
            className="mt-[20px] mr-[44px] mb-[19px] pl-[18px]"
            id="add-article"
          >
            <Add20Regular className="mr-[10.5px]" />
            Tambah
          </Button>
        </Link>
      </div>

      {/* search */}
      <div className="ml-[45px] mt-[31px] mb-[29px] w-[1121px]">
        <div className="relative mb-4 flex w-full items-stretch">
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
          title={"Hapus Produk"}
          text={"Apakah Anda yakin ingin menghapus produk ini?"}
          cancelText={"Kembali"}
          confirmText={"Hapus"}
          onConfirm={() => handleDelete(modalDelete)}
          onCancel={() => setModalDelete(null)}
          isOpen={modalDelete ? true : false}
        />
      )}

      {/* Table */}

      <div className="pl-[45px] pr-[29px] w-full h-[620px] mb-[10px]  ">
        <div className="overflow-x-auto">
          <Table
            headers={["Header", "Judul Artikel", "Viewers", "Aksi"]}
            className="w-full text-center"
          >
            {filterProduct.map((product, index) => (
              <tr key={index} className="text-center border-b">
                <td className="whitespace-nowrap px-6 py-4 font-medium flex justify-center">
                  <img
                    src={product.image}
                    className="w-[56px] h-[48px]"
                    alt="Avatar Tailwind CSS Component"
                  />
                </td>
                <td className="text-caption-lg">{product.name}</td>
                <td className="text-caption-lg">Otto</td>
                <td>
                  <div className="flex gap-1 justify-center">
                    <Link to={`/admin/articles/${product.id}`}>
                      <Eye24Regular
                        className="cursor-pointer hover:text-info"
                        id="detail-article"
                      />
                    </Link>
                    <Delete24Regular
                      className="cursor-pointer hover:text-info"
                      onClick={() => setModalDelete(product.id)}
                      id="delete-article"
                    />
                    <Link to={`/admin/articles/update/${product.id}`}>
                      <Edit24Regular
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
    </>
  );
}
