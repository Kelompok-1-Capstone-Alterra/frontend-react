import { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import useSWR from "swr";
import image from "../assets/illustrasi.png";
import {
  Eye20Regular,
  Delete20Regular,
  Edit20Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/Modal";
import MainContainer from "../components/layouts/MainContainer";
import fetcher from "../utils/fetcher";
import Cookies from "js-cookie";
import useWeather from "../hooks/useWeather";
import { NotifModal } from "../components/Modal";
import Loading from "../components/Loading";

const WeatherManagementPage = () => {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers`;
  const { data, isLoading, mutate, error } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );
  const weathers = data?.data;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const { deleteWeather } = useWeather();

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    const del = await deleteWeather(deleteItemId);
    if (del.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Informasi cuaca gagal di hapus",
        title: "Informasi cuaca",
      });
      return;
    }
    setShowModal({
      show: true,
      icon: "success",
      text: "Informasi cuaca berhasil di hapus",
      title: "Informasi cuaca ",
    });
    mutate();
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  if (error) {
    return <div>Error while fetching data</div>;
  }

  return (
    <>
      <MainContainer>
        <div>
          <h4 className="text-h-4 font-bold mb-5">Management Cuaca</h4>
          <div className="flex justify-end mb-5">
            <Button
              size="lg"
              className="px-4"
              onClick={() => navigate("/admin/weathers/create")}>
              Tambah Informasi Cuaca
            </Button>
          </div>
          <div>
            {isLoading && <Loading />}
            {weathers === null && (
              <>
                <div className="flex flex-col justify-center items-center mt-16">
                  <div>
                    <img src={image} alt="gambar" />
                  </div>
                  <p className=" text-body-lg text-[#637381]">
                    Informasi cuaca masih kosong
                  </p>
                </div>
              </>
            )}
            {weathers && weathers.length > 0 && (
              <Table
                id="table"
                headers={["No", "Gambar", "Label", "Judul", "Aksi"]}
                className={"overflow-y-scroll mt-7 w-full overflow-x-hidden"}>
                {weathers.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80">
                    <td className="text-caption-lg">{index + 1}</td>
                    <td>
                      <img
                        src={`https://34.128.85.215:8080/pictures/${item.weather_pictures[0]}`}
                        alt="Gambar"
                        className="w-[85px] h-[51px] mx-auto"
                      />
                    </td>
                    <td className="text-caption-lg  text-neutral-80">
                      {item.weather_label}
                    </td>
                    <td className="text-caption-lg  text-neutral-80">
                      {item.weather_title}
                    </td>
                    <td className="space-x-3">
                      <Eye20Regular
                        onClick={() => navigate(`/admin/weathers/${item.id}`)}
                        className="cursor-pointer hover:text-info w-5"
                        id="detail-button"
                      />
                      <Delete20Regular
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer hover:text-info w-5"
                        id="delete-button"
                      />

                      <Edit20Regular
                        className="cursor-pointer hover:text-info w-5"
                        onClick={() =>
                          navigate(`/admin/weathers/update/${item.id}`)
                        }
                        id="edit-button"
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </div>
        <div
          className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
            showConfirmModal || showModal.show ? "block" : "hidden"
          } cursor-pointer top-0 bottom-0 left-0 right-0`}>
          <ConfirmModal
            isOpen={showConfirmModal}
            title="Konfirmasi Hapus Data Informasi Cuaca"
            text="Yakin ingin menghapus data informasi cuaca ini ?"
            cancelText="Tidak"
            confirmText="Ya"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            icon="delete"
            id="confirm-modal"
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
            id="notif-modal"
          />
        </div>
      </MainContainer>
    </>
  );
};

export default WeatherManagementPage;
