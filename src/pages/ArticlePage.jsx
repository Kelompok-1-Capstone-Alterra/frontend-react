import Button from "../components/Button";
import {
  Add20Regular,
  Edit20Regular,
  Eye20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import Cookies from "js-cookie";
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
import useArticle from "../hooks/useArticle";
import EmptyArticle from "../assets/EmptyArticle.png";
import EmptySearch from "../assets/EmptyArticleSearch.png";
import ImageOverlay from "../components/ImageOverlay";
import Loading from "../components/Loading";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

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
        }/auth/admins/articles/search?title=${debouncedKeyword}`
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
  const { deleteArticle } = useArticle();
  const [imageOverlay, setImageOverlay] = useState({
    isOpen: false,
    image: null,
  });

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

    if (filteredArticles?.length === 1 && currentPage > 1) {
      setFilter((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }

    const del = await deleteArticle(id);
    if (del.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Data artikel kamu gagal dihapus",
        title: "Aksi Gagal",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Data artikel berhasil dihapus",
      title: "Hapus Data Artikel",
    });
    mutate();
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

      {/* Table */}
      <div className="w-full">
        {isArticlesLoading ? (
          <Loading />
        ) : (
          <>
            {!articles && keyword !== "" ? (
              <div className="flex mt-14 flex-col items-center justify-center">
                <img
                  src={EmptySearch}
                  alt="empty article"
                  id="empty-article"
                />
                <p className="text-body-lg mt-2 text-[#6B7280]">
                  Artikel yang kamu cari tidak ada
                </p>
              </div>
            ) : !articles ? (
              <div className="flex mt-14 flex-col items-center justify-center">
                <img
                  src={EmptyArticle}
                  alt="empty article"
                  id="empty-article"
                />
                <p className="text-body-lg mt-2 text-[#6B7280]">
                  Kamu belum menambahkan data artikel
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table
                  headers={[
                    "Gambar",
                    "Judul Artikel",
                    "Dilihat",
                    "Disukai",
                    "Aksi",
                  ]}
                  className={
                    "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
                  }
                >
                  {filteredArticles?.map((article, index) => (
                    <tr
                      key={index}
                      className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                    >
                      <td>
                        <ImageWithSkeleton
                          src={
                            article?.article_pictures?.length > 0
                              ? `https://34.128.85.215:8080/pictures/${article.article_pictures[0]}`
                              : "http://via.placeholder.com/56x48"
                          }
                          width={56}
                          height={48}
                          className="mx-auto cursor-pointer"
                          alt="Article avatar"
                          onClick={() =>
                            setImageOverlay({
                              isOpen: true,
                              image: `https://34.128.85.215:8080/pictures/${article.article_pictures[0]}`,
                            })
                          }
                        />
                      </td>
                      <td className="text-caption-lg">
                        {article.article_title}
                      </td>
                      <td className="text-caption-lg">
                        {article.article_view > 0
                          ? `${article.article_view} kali`
                          : 0}
                      </td>
                      <td className="text-caption-lg">
                        {article.article_like > 0
                          ? `${article.article_like} orang`
                          : 0}
                      </td>
                      <td>
                        <div className="flex gap-3 justify-center">
                          <Link
                            to={`/admin/articles/${article.id}`}
                            id={`detail-link-${article.id}`}
                          >
                            <Eye20Regular
                              className="cursor-pointer hover:text-info"
                              id={`detail-article-${article.id}`}
                            />
                          </Link>
                          <Delete20Regular
                            className="cursor-pointer hover:text-info"
                            onClick={() => setModalDelete(article.id)}
                            id={`delete-article-${article.id}`}
                          />
                          <Link
                            to={`/admin/articles/update/${article.id}`}
                            id={`update-link-${article.id}`}
                          >
                            <Edit20Regular
                              className="cursor-pointer hover:text-info"
                              id={`update-article-${article.id}`}
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
                    totalPages={articles?.length > 0 ? totalPages : 1}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <ImageOverlay
        image={imageOverlay.image}
        isOpen={imageOverlay.isOpen}
        onClose={() => setImageOverlay({ isOpen: false, image: null })}
      />
      <ConfirmModal
        icon={"delete"}
        title={"Konfirmasi Hapus Data Artikel"}
        text={"Yakin ingin menghapus data artikel ini?"}
        cancelText={"Tidak"}
        confirmText={"Ya"}
        onConfirm={() => handleDelete(modalDelete)}
        onCancel={() => setModalDelete(null)}
        isOpen={modalDelete ? true : false}
      />
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
