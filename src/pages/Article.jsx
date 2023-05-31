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
import { ConfirmModal } from "../components/Modal";


export default function Article() {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState(productList);
  const [modalDelete, setModalDelete] = useState(false);

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

  const handleDelete = async (id) => {
    setModalDelete(false)
    axios
    .delete(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
    .then((response) => {
      const updatedProductList = productList.filter((product) => product.id !== id);
      setProductList(updatedProductList);
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <>
      <MainContainer />
      {/* title */}
      <div className="ml-[25px] flex">
        <h1 className="font-bold text-h-4 font-bold">Artikel</h1>
      </div>

      {/* search */}
      <div className="ml-[45px] mt-[31px] mb-[29px] w-[1121px]">
        <div className="relative mb-4 flex w-full items-stretch">
          <TextField
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
        <div className="border w-full flex">
          <div className="overflow-x-auto">
            <div className="w-full flex">
              <h1 className="w-[90rem] text-body-lg mt-[34px] ml-[24px] mb-[33px] font-semibold">
                Artikel Aktif
              </h1>
              <Link to="/admin/articles/create" className="flex">
                <Button className="mt-[20px] mr-[44px] mb-[19px] pl-[18px]">
                  <Add20Regular className="mr-[10.5px]" />
                  Tambah
                </Button>
              </Link>
            </div>
            <Table
              headers={[
                "Judul Artikel",
                "Ukuran File",
                "Tanggal Upload",
                "Dilihat",
                "Disukai",
                "Aksi",
              ]}
              className="w-full text-center"
            >
              {productList
                .filter((value) =>
                  value.name.toLowerCase().includes(filteredList)
                )
                .map((product, index) => (
                  <tr key={index} className="text-center border-b">
                    <td className="whitespace-nowrap px-6 py-4 font-medium flex">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 rounded-full">
                            <img
                              src={product.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-caption-lg">
                      {product.name}
                    </td>
                    <td className="text-caption-lg">Otto</td>
                    <td className="text-caption-lg">@mdo</td>
                    <td className="text-caption-lg">@mdo</td>
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
                          id="delete-product"
                        />
                        <Link to={`/admin/articles/update/${product.id}`}>
                          <Edit24Regular
                            className="cursor-pointer hover:text-info"
                            id="update-product"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
