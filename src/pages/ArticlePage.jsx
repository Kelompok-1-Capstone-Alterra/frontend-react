import Button from "../components/Button";
import {
  Add20Regular,
  Edit20Regular,
  Eye20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";
import Table from "../components/Table";
import { ConfirmModal, NotifModal } from "../components/Modal";
import PaginationButton from "../components/PaginationButton";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";
import fetcher from "../utils/fetcher";

const ITEMS_PER_PAGE = 8;
const DEBOUNCE_DELAY = 500;

export default function ArticlePage() {
  const [filter, setFilter] = useState({
    currentPage: 1,
    keyword: "",
  });
  const { currentPage, keyword } = filter;
  const debouncedKeyword = useDebounce(keyword, DEBOUNCE_DELAY);
  const {
    data,
    isLoading: isArticlesLoading,
    mutate,
  } = useSWR(
    debouncedKeyword
      ? `${
          import.meta.env.VITE_API_BASE_URL
        }/auth/admins/articles/search?keyword=${debouncedKeyword}`
      : `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [modalDelete, setModalDelete] = useState(false);

  const handleInputChange = (event) => {
    const newKeyword = event.target.value;
    setFilter({
      ...filter,
      keyword: newKeyword,
    });
  };

  const articles = data?.data;
  let filteredArticles = articles;

  const totalPages = Math.ceil(filteredArticles?.length / ITEMS_PER_PAGE);

  filteredArticles = filteredArticles?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setFilter({
      ...filter,
      currentPage: page,
    });
  };

  const handleDelete = async (id) => {
    setModalDelete(false);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}`
      );
      console.log(response);
      mutate();
      setShowModal({
        show: true,
        icon: "success",
        text: "Artikel Berhasil Dihapus",
        title: "Hapus Artikel",
      });
    } catch (error) {
      console.log(error);
      setShowModal({
        show: true,
        icon: "info",
        text: "Artikel Gagal Dihapus",
        title: "Hapus Artikel",
      });
    }
  };

  return (
    <MainContainer>
      {/* title */}
      <h4 className="text-h-4 font-bold">Artikel</h4>

      {/* search */}
      <div className="grid grid-cols-2 w-full mt-12">
        <div className="relative mb-3 flex w-3/4 items-stretch">
          <TextField
            id="search-article"
            variant="search"
            placeholder="Ketik Judul Artikel"
            type="search"
            className={"pe-2"}
            onChange={handleInputChange}
          ></TextField>
        </div>
        <Link
          to="/admin/articles/create"
          className="justify-self-end"
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
        {isArticlesLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredArticles?.length <= 0 ? (
              <p className="text-center">Tidak ada artikel</p>
            ) : (
              <div className="overflow-x-auto">
                <Table
                  headers={["Gambar", "Judul", "Dilihat", "Disukai", "Aksi"]}
                  className={
                    "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
                  }
                >
                  {filteredArticles?.map((article, index) => (
                    <tr
                      key={index}
                      className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                    >
                      <td className="flex justify-center">
                        <img
                          src={
                            article.article_pictures[0].url
                              ? `https://34.128.85.215:8080/pictures/${article.article_pictures[0].url}`
                              : "http://via.placeholder.com/56x48"
                          }
                          className="w-[56px] h-[48px]"
                          alt="Article avatar"
                        />
                      </td>
                      <td className="text-caption-lg">
                        {article.article_title}
                      </td>
                      <td className="text-caption-lg">
                        {article.article_view}
                      </td>
                      <td className="text-caption-lg">
                        {article.article_like}
                      </td>
                      <td>
                        <div className="flex gap-3 justify-center">
                          <Link to={`/admin/articles/${article.ID}`}>
                            <Eye20Regular
                              className="cursor-pointer hover:text-info"
                              id="detail-article"
                            />
                          </Link>
                          <Delete20Regular
                            className="cursor-pointer hover:text-info"
                            onClick={() => setModalDelete(article.ID)}
                            id="delete-article"
                          />
                          <Link to={`/admin/articles/update/${article.ID}`}>
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
                    totalPages={filteredArticles?.length > 0 ? totalPages : 1}
                  />
                </div>
              </div>
            )}
          </>
        )}
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
