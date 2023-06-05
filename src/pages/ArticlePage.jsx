import Button from "../components/Button";
import {
  Add20Regular,
  Edit20Regular,
  Eye20Regular,
  Delete20Regular,
} from "@fluentui/react-icons";
import axios from "axios";
import { useState } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";
import Table from "../components/Table";
import { ConfirmModal, NotifModal } from "../components/Modal";
import PaginationButton from "../components/PaginationButton";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const ITEMS_PER_PAGE = 8;

export default function ArticlePage() {
  const {
    data: articles,
    isLoading: isArticlesLoading,
    mutate,
  } = useSWR(
    "https://6428ef045a40b82da4c9fa2d.mockapi.io/api/articles",
    fetcher
  );

  const [filter, setFilter] = useState({
    search: "",
    currentPage: 1,
  });
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const [modalDelete, setModalDelete] = useState(false);

  const { search, currentPage } = filter;

  // search
  let filteredArticles = articles;

  filteredArticles = filteredArticles?.filter((article) =>
    article.article_title.toLowerCase().includes(search.toLowerCase())
  );

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
        `https://6428ef045a40b82da4c9fa2d.mockapi.io/api/articles/${id}`
      );
      if (response.status === 200) {
        mutate();
        setShowModal({
          show: true,
          icon: "success",
          text: "Artikel Telah Berhasil Dihapus",
          title: "Hapus Artikel",
        });
      }
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

      <div className="relative mb-3 flex w-full items-stretch">
        <TextField
          id="search-article"
          variant="search"
          placeholder="Ketik Judul Artikel"
          type="search"
          onChange={(event) => {
            setFilter({
              ...filter,
              search: event.target.value,
              currentPage: 1,
            });
          }}
        ></TextField>
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
                  headers={["Header", "Judul Artikel", "Viewers", "Aksi"]}
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
                          src={article.article_pictures}
                          className="w-[56px] h-[48px]"
                          alt="Article avatar"
                        />
                      </td>
                      <td className="text-caption-lg">
                        {article.article_title}
                      </td>
                      <td className="text-caption-lg">128</td>
                      <td>
                        <div className="flex gap-3 justify-center">
                          <Link to={`/admin/articles/${article.id}`}>
                            <Eye20Regular
                              className="cursor-pointer hover:text-info"
                              id="detail-article"
                            />
                          </Link>
                          <Delete20Regular
                            className="cursor-pointer hover:text-info"
                            onClick={() => setModalDelete(article.id)}
                            id="delete-article"
                          />
                          <Link to={`/admin/articles/update/${article.id}`}>
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
