import TextField from "../components/TextField";
import Table from "../components/Table";
import Tab from "../components/Tab";
import { useState } from "react";
import Button from "../components/Button";
import {
  Add24Regular,
  Eye24Regular,
  Delete24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";
import axios from "axios";
import useSWR from "swr";
import PaginationButton from "../components/PaginationButton";
import { ConfirmModal, NotifModal } from "../components/Modal";
import EmptyProduct from "../assets/EmptyProduct.png";
import { Link } from "react-router-dom";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ITEMS_PER_PAGE = 8;

const RenderContent = ({
  filteredProducts,
  currentPage,
  handlePageChange,
  totalPages,
  totalProducts,
  setConfirmModalId,
  isLoading,
  tab,
}) => {
  return (
    <>
      <div className="lg:my-5 flex justify-between w-full items-center">
        <p className="text-body-lg font-bold">{totalProducts} Produk</p>
        <Button
          size="sm"
          className={"rounded-md"}
        >
          <Add24Regular className="me-2" />
          Tambah Produk Baru
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {totalProducts && totalProducts > 0 ? (
            <>
              <Table
                headers={["Gambar", "Nama Produk", "Harga", "Status", "Aksi"]}
                className={"w-full"}
              >
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="text-center border-b"
                  >
                    <td>
                      <img
                        src={product.images}
                        alt="gambar"
                        className="w-[56px] h-[48px] mx-auto"
                      />
                    </td>
                    <td className="text-caption-lg">{product.name}</td>
                    <td className="text-caption-lg">Rp. {product.price}</td>
                    <td className="text-caption-lg">
                      {product.is_archived ? "Diarsipkan" : "Etalase"}
                    </td>
                    <td>
                      <div className="flex gap-1 justify-center">
                        <Link to={`/admin/products/${product.id}`}>
                          <Eye24Regular className="cursor-pointer hover:text-primary" />
                        </Link>
                        <Delete24Regular
                          className="cursor-pointer hover:text-primary"
                          onClick={() => setConfirmModalId(product.id)}
                        />
                        <Link to={`/admin/products/update/${product.id}`}>
                          <Edit24Regular className="cursor-pointer hover:text-primary" />
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
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={EmptyProduct}
                  alt="empty product"
                />
                <p className="text-body-lg text-[#6B7280]">
                  Belum ada produk{" "}
                  {tab === "semua" ? "diinputkan" : "di " + tab}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default function ProductsPage() {
  const [filter, setFilter] = useState({
    search: "",
    is_archived: false,
    currentPage: 1,
  });
  const [confirmModalId, setConfirmModalId] = useState(null);
  const [notifModal, setNotifModal] = useState({
    show: false,
    isSuccess: false,
    text: "",
    title: "",
  });
  const {
    data: products,
    isLoading,
    mutate,
  } = useSWR(
    "https://6428ef045a40b82da4c9fa2d.mockapi.io/api/products",
    fetcher
  );
  const totalIsArchived = products?.filter((product) => product.is_archived);
  const { search, currentPage } = filter;

  let filteredProducts = products;

  const [activeTabIndex, setActiveTabIndex] = useState(0); // state untuk menentukan tab mana yang aktif, jika 0 berarti index ke 0 dari array tabs diatas

  filteredProducts = filteredProducts?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  filteredProducts = filteredProducts?.filter((product) => {
    if (activeTabIndex === 0) {
      return product;
    } else if (activeTabIndex === 1) {
      return product.is_archived === false;
    } else if (activeTabIndex === 2) {
      return product.is_archived === true;
    }
  });

  const totalPages = Math.ceil(filteredProducts?.length / ITEMS_PER_PAGE);

  filteredProducts = filteredProducts?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      currentPage: page,
    });
  };

  const handleActiveTabChange = (index) => {
    setActiveTabIndex(index);
    setFilter({
      ...filter,
      currentPage: 1,
    });
  };

  const handleDelete = async (id) => {
    setConfirmModalId(null);
    const result = await axios.delete(
      `https://6428ef045a40b82da4c9fa2d.mockapi.io/api/products/${id}`
    );
    if (result.status === 200) {
      setNotifModal({
        show: true,
        text: "Produk berhasil dihapus",
        title: "Berhasil",
      });
      mutate();
    } else {
      setNotifModal({
        show: true,
        text: "Produk gagal dihapus",
        title: "Gagal",
      });
    }
  };

  const tabs = [
    {
      id: "semua",
      title: "Semua",
      content: (
        <>
          <RenderContent
            filteredProducts={filteredProducts}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            setConfirmModalId={setConfirmModalId}
            totalProducts={products?.length}
            isLoading={isLoading}
            tab="semua"
          />
        </>
      ),
    },
    {
      id: "etalase",
      title: "Etalase",
      content: (
        <>
          <RenderContent
            filteredProducts={filteredProducts}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalPages={totalPages}
            totalProducts={products?.length - totalIsArchived?.length}
            isLoading={isLoading}
            tab="etalase"
          />
        </>
      ),
    },
    {
      id: "arsip",
      title: "Diarsipkan",
      content: (
        <>
          <RenderContent
            filteredProducts={filteredProducts}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalPages={totalPages}
            totalProducts={totalIsArchived?.length}
            isLoading={isLoading}
            tab="arsip"
          />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full">
        <h4 className="text-h-4 font-bold lg:mt-[78px] lg:ms-7">Produk</h4>
        <div className="lg:px-16 lg:mt-6 lg:mb-16">
          <div className="flex w-full lg:mt-6">
            <TextField
              variant="search"
              label={"Nama Produk"}
              className={"w-full"}
              placeholder={"Ketik Kata Kunci"}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  search: e.target.value,
                })
              }
            />
          </div>
          <div className="lg:mt-4">
            <Tab
              tabs={tabs}
              widthFull={false}
              activeTabIndex={activeTabIndex}
              setActiveTabIndex={handleActiveTabChange}
            />
          </div>
        </div>
      </div>
      <ConfirmModal
        icon={"delete"}
        title={"Hapus Produk"}
        text={"Kamu yakin ingin menghapus produk ini?"}
        cancelText={"Kembali"}
        confirmText={"Hapus"}
        onConfirm={() => handleDelete(confirmModalId)}
        onCancel={() => setConfirmModalId(null)}
        isOpen={confirmModalId ? true : false}
      />
      <NotifModal
        icon={"info"}
        onConfirm={() => {
          setNotifModal({
            ...notifModal,
            show: false,
          });
        }}
        isOpen={notifModal.show}
        confirmText={"Tutup"}
        title={notifModal.title}
        text={notifModal.text}
      />
    </>
  );
}
