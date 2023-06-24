import { useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import useSWR from "swr";
import image from "../../assets/img/weathers/EmptyWeather.png";
import {
  Eye20Regular,
  Delete20Regular,
  Edit20Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components/Modal";
import MainContainer from "../../components/layouts/MainContainer";
import fetcher from "../../utils/fetcher";
import Cookies from "js-cookie";
import useWeather from "../../hooks/useWeather";
import { NotifModal } from "../../components/Modal";
import Loading from "../../components/Loading";
import ImageOverlay from "../../components/ImageOverlay";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import useImage from "../../hooks/useImage";

const WeatherManagementPage = () => {
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_BASE_URL}/auth/admins/weathers`;
  const { data, isLoading, mutate } = useSWR(
    url,
    async (url) => fetcher(url, Cookies.get("token")),
    {
      onError: (err) => {
        if (err.response.status === 500) {
          console.log("Internal Server Error");
        }
      },
    }
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
  const [imageOverlay, setImageOverlay] = useState({
    isOpen: false,
    image: null,
  });

  const { deleteWeather } = useWeather();
  const { deleteImage } = useImage();
  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    const weather = weathers.find((weather) => weather.id == deleteItemId);
    if (weather?.weather_pictures?.length > 0) {
      await deleteImage(weather.weather_pictures[0]);
    }
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

  return (
    <>
      <MainContainer>
        <div>
          <h4 className="text-h-4 font-bold mb-5">Management Cuaca</h4>
          <div className="flex justify-end mb-5">
            <Button
              size="lg"
              className="px-4"
              id="btn-add-weather"
              onClick={() => navigate("/admin/weathers/create")}
            >
              Tambah Informasi Cuaca
            </Button>
          </div>
          <div>
            {isLoading && <Loading />}
            {weathers === null && (
              <>
                <div className="flex flex-col justify-center items-center mt-16">
                  <div>
                    <img
                      src={image}
                      alt="gambar"
                    />
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
                className={"overflow-y-scroll mt-7 w-full overflow-x-hidden"}
              >
                {weathers.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td className="text-caption-lg">{index + 1}</td>
                    <td className="flex justify-center">
                      <div className="w-[88px] h-[51px]">
                        <ImageWithSkeleton
                          src={`https://34.128.85.215:8080/pictures/${item.weather_pictures[0]}`}
                          alt="Gambar"
                          width={85}
                          height={51}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() =>
                            setImageOverlay({
                              isOpen: true,
                              image: `https://34.128.85.215:8080/pictures/${item.weather_pictures[0]}`,
                            })
                          }
                          id={`image-weather-${item.id}`}
                        />
                      </div>
                    </td>
                    <td
                      className="text-caption-lg  text-neutral-80"
                      id={`weather-label-${item.id}`}
                    >
                      {item.weather_label}
                    </td>
                    <td
                      className="text-caption-lg  text-neutral-80"
                      id={`weather-title-${item.id}`}
                    >
                      {item.weather_title}
                    </td>
                    <td className="space-x-3">
                      <Eye20Regular
                        onClick={() => navigate(`/admin/weathers/${item.id}`)}
                        className="cursor-pointer hover:text-info"
                        id={`detail-button-${item.id}`}
                      />
                      <Delete20Regular
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer hover:text-info"
                        id={`delete-button-${item.id}`}
                      />

                      <Edit20Regular
                        className="cursor-pointer hover:text-info"
                        onClick={() =>
                          navigate(`/admin/weathers/update/${item.id}`)
                        }
                        id={`edit-button-${item.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>
        </div>
        <ImageOverlay
          image={imageOverlay.image}
          isOpen={imageOverlay.isOpen}
          onClose={() => setImageOverlay({ isOpen: false, image: null })}
        />
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
      </MainContainer>
    </>
  );
};

export default WeatherManagementPage;
