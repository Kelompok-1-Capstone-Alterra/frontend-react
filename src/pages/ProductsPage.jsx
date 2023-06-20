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
import useSWR from "swr";
import PaginationButton from "../components/PaginationButton";
import { ConfirmModal, NotifModal } from "../components/Modal";
import EmptyProduct from "../assets/EmptyProduct.png";
import { Link } from "react-router-dom";
import fetcher from "../utils/fetcher";
import { toRupiah } from "../utils/functions";
import Cookies from "js-cookie";
import useProduct from "../hooks/useProduct";
import useDebounce from "../hooks/useDebounce";
import ImageOverlay from "../components/ImageOverlay";
import Loading from "../components/Loading";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

const ITEMS_PER_PAGE = 8;
const DEBOUNCE_DELAY = 500;

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
  setImageOverlay,
}) => {
  return (
    <>
      <div className="lg:my-5 flex justify-between w-full items-center">
        <p className="text-body-lg font-bold">
          {totalProducts > 0 ? totalProducts : "0"} Produk
        </p>
        <Link
          to={"/admin/products/create"}
          id="add-product-link"
        >
          <Button
            size="sm"
            id="add-product-button"
            className={"rounded-lg px-0 w-[243px] h-[42px]"}
          >
            <Add20Filled className="me-2" />
            Tambah Produk Baru
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {totalProducts > 0 ? (
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
                      <ImageWithSkeleton
                        src={
                          product.product_picture
                            ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                                product.product_picture
                              }`
                            : "http://via.placeholder.com/56x48"
                        }
                        alt="gambar"
                        width={56}
                        height={48}
                        className="mx-auto cursor-pointer"
                        onClick={() =>
                          setImageOverlay(
                            `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                              product.product_picture
                            }`
                          )
                        }
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
                        <Link
                          id={`detail-product-link-${product.id}`}
                          to={`/admin/products/${product.id}`}
                        >
                          <Eye20Regular
                            className="cursor-pointer hover:text-info"
                            id={`detail-product-icon-${product.id}`}
                          />
                        </Link>
                        <Delete20Regular
                          className="cursor-pointer hover:text-info"
                          onClick={() => setConfirmModalId(product.id)}
                          id={`delete-product-icon-${product.id}`}
                        />
                        <Link
                          id={`detail-product-link-${product.id}`}
                          to={`/admin/products/update/${product.id}`}
                        >
                          <Edit20Regular
                            className="cursor-pointer hover:text-info"
                            id={`update-product-icon-${product.id}`}
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
          ) : !totalProducts && !filteredProducts && search ? (
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
    keyword: "",
  });
  const { currentPage, keyword } = filter;
  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_DELAY);
  const [confirmModalId, setConfirmModalId] = useState(null);
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [activeTabIndex, setActiveTabIndex] = useState(0); // 0: semua, 1: etalase, 2: arsip
  const { deleteProduct } = useProduct();
  const [imageOverlay, setImageOverlay] = useState(null);

  const getUrl = (tab, keyword) => {
    let resource = "";
    if (tab === 1 && keyword === "") {
      resource = "/display";
    }
    if (tab === 2 && keyword === "") {
      resource = "/archive";
    }
    if (keyword !== "") {
      resource = `/search?name=${keyword}`;
    }
    return `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/admins/products${resource}`;
  };

  const {
    data: products,
    isLoading,
    mutate,
  } = useSWR(
    getUrl(activeTabIndex, debouncedKeyword),
    (url) => fetcher(url, Cookies.get("token")),
    {
      onError: (err) => {
        if (err.response.status === 500) {
          console.log("Internal Server Error");
        }
      },
    }
  );

  let filteredProducts;
  if (activeTabIndex === 0) {
    filteredProducts = products?.data;
  } else if (activeTabIndex === 1) {
    filteredProducts = products?.data?.filter(
      (product) => product.product_status === true
    );
  } else if (activeTabIndex === 2) {
    filteredProducts = products?.data?.filter(
      (product) => product.product_status === false
    );
  }

  const totalProducts = filteredProducts?.length;
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
    const result = await deleteProduct(id);

    if (filteredProducts?.length === 1 && currentPage > 1) {
      setFilter((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }

    if (result.status !== 200) {
      setNotifModal({
        show: true,
        icon: "info",
        text: "Aksi Gagal",
        title: "Data produk kamu gagal dihapus",
      });
      return;
    }
    setNotifModal({
      show: true,
      icon: "success",
      text: "Data produk kamu berhasil dihapus",
      title: "Hapus Data Produk",
    });
    mutate();
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
            search={keyword}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            totalProducts={totalProducts}
            setConfirmModalId={setConfirmModalId}
            isLoading={isLoading}
            setImageOverlay={setImageOverlay}
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
            search={keyword}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalProducts={totalProducts}
            totalPages={totalPages}
            isLoading={isLoading}
            setImageOverlay={setImageOverlay}
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
            search={keyword}
            handlePageChange={handlePageChange}
            setConfirmModalId={setConfirmModalId}
            totalProducts={totalProducts}
            setImageOverlay={setImageOverlay}
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
              type="search"
              className={"w-ful pe-2"}
              placeholder={"Ketik Kata Kunci"}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  keyword: e.target.value,
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
        icon={"delete"}
        title={"Konfirmasi Hapus Data Produk"}
        text={"Yakin ingin menghapus data produk ini?"}
        cancelText={"Tidak"}
        confirmText={"Ya"}
        onConfirm={() => handleDelete(confirmModalId)}
        onCancel={() => setConfirmModalId(null)}
        isOpen={confirmModalId ? true : false}
      />
      <NotifModal
        icon={notifModal.icon}
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
      <ImageOverlay
        image={imageOverlay}
        isOpen={imageOverlay ? true : false}
        onClose={() => setImageOverlay(null)}
      />
    </>
  );
}
