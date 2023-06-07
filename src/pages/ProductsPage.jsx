import TextField from "../components/TextField";
import Table from "../components/Table";
import Tab from "../components/Tab";
import { useState } from "react";
import MainContainer from "../components/layouts/MainContainer";
import Button from "../components/Button";
import {
  Add20Filled,
  Eye20Regular,
  Delete20Regular,
  Edit20Regular,
} from "@fluentui/react-icons";
import axios from "axios";
import useSWR from "swr";
import PaginationButton from "../components/PaginationButton";
import { ConfirmModal, NotifModal } from "../components/Modal";
import EmptyProduct from "../assets/EmptyProduct.png";
import { Link } from "react-router-dom";
import fetcher from "../utils/fetcher";
import { toRupiah } from "../utils/functions";
import Cookies from "js-cookie";

const ITEMS_PER_PAGE = 8;

const RenderContent = ({
  filteredProducts,
  currentPage,
  handlePageChange,
  totalPages,
  search,
  totalProducts,
  setConfirmModalId,
  isLoading,
  tab,
}) => {
  return (
    <>
      <div className="lg:my-5 flex justify-between w-full items-center">
        <p className="text-body-lg font-bold">
          {totalProducts > 0 ? totalProducts : "0"} Produk
        </p>
        <Link
          to={"/admin/products/create"}
          id="add-product"
        >
          <Button
            size="sm"
            className={"rounded-lg px-0 w-[243px] h-[42px]"}
          >
            <Add20Filled className="me-2" />
            Tambah Produk Baru
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredProducts?.length > 0 ? (
            <>
              <Table
                headers={[
                  "Gambar",
                  "Nama Produk",
                  "Seller",
                  "Harga",
                  "Kategori",
                  "Status",
                  "Aksi",
                ]}
                className={"w-full"}
              >
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td>
                      <img
                        // src={product.images && product.images[0]}
                        src={
                          product.product_picture
                            ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                                product.product_picture
                              }`
                            : "http://via.placeholder.com/56x48"
                        }
                        alt="gambar"
                        className="w-[56px] h-[48px] mx-auto"
                      />
                    </td>
                    <td className="text-caption-lg">{product.product_name}</td>
                    <td className="text-caption-lg">
                      {product.product_seller_name}
                    </td>
                    <td className="text-caption-lg">
                      {toRupiah(product.product_price)}
                    </td>
                    <td className="text-caption-lg">
                      {product.product_category}
                    </td>
                    <td className="text-caption-lg">
                      {product.product_status ? "Etalase" : "Diarsipkan"}
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center">
                        <Link to={`/admin/products/${product.id}`}>
                          <Eye20Regular
                            className="cursor-pointer hover:text-info"
                            id="detail-product"
                          />
                        </Link>
                        <Delete20Regular
                          className="cursor-pointer hover:text-info"
                          onClick={() => setConfirmModalId(product.id)}
                          id="delete-product"
                        />
                        <Link to={`/admin/products/update/${product.id}`}>
                          <Edit20Regular
                            className="cursor-pointer hover:text-info"
                            id="update-product"
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
            </>
          ) : totalProducts <= 0 && filteredProducts <= 0 && search ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={EmptyProduct}
                  alt="empty product"
                  id="empty-product"
                />
                <p className="text-body-lg text-[#6B7280]">
                  Produk yang kamu cari tidak tersedia
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={EmptyProduct}
                  alt="empty product"
                  id="empty-product"
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
    currentPage: 1,
  });

  const [confirmModalId, setConfirmModalId] = useState(null);

  const [notifModal, setNotifModal] = useState({
    show: false,
    isSuccess: false,
    text: "",
    title: "",
  });

  const [activeTabIndex, setActiveTabIndex] = useState(0); // 0: semua, 1: etalase, 2: arsip

  const getUrl = (tab) => {
    let resource = "";
    if (tab === 1) {
      resource = "/display";
    }
    if (tab === 2) {
      resource = "/archive";
    }
    return `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/admins/products${resource}`;
  };

  const {
    data: products,
    isLoading,
    mutate,
    errors,
  } = useSWR(getUrl(activeTabIndex), (url) =>
    fetcher(url, Cookies.get("token"))
  );

  if (errors) {
    console.log(errors);
  }

  const { search, currentPage } = filter;

  let filteredProducts = products?.data;

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
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (result.status === 200) {
        setNotifModal({
          show: true,
          text: "Produk berhasil dihapus",
          title: "Hapus Produk",
        });
        mutate();
      }
    } catch (error) {
      console.log(error);
      setNotifModal({
        show: true,
        text: "Produk gagal dihapus",
        title: "Hapus Produk",
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
            search={search}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            totalProducts={products?.data?.length}
            setConfirmModalId={setConfirmModalId}
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
            search={search}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalProducts={products?.data?.length}
            totalPages={totalPages}
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
            search={search}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalProducts={products?.data?.length}
            totalPages={totalPages}
            isLoading={isLoading}
            tab="arsip"
          />
        </>
      ),
    },
  ];

  return (
    <>
      <MainContainer>
        <h4 className="text-h-4 font-bold"> Produk</h4>
        <div className="lg:mt-6">
          <div className="flex w-full lg:mt-6">
            <TextField
              variant="search"
              label={"Nama Produk"}
              id={"search"}
              className={"w-full"}
              placeholder={"Ketik Kata Kunci"}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  search: e.target.value,
                  currentPage: 1,
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
      </MainContainer>
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          confirmModalId || notifModal.show ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>
      <ConfirmModal
        icon={"info"}
        title={"Hapus Produk"}
        text={"Apakah Anda yakin ingin menghapus produk ini?"}
        cancelText={"Kembali"}
        confirmText={"Hapus"}
        onConfirm={() => handleDelete(confirmModalId)}
        onCancel={() => setConfirmModalId(null)}
        isOpen={confirmModalId ? true : false}
      />
      <NotifModal
        icon={"success"}
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
