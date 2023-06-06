import { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "axios";
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

const WeatherManagementPage = () => {
  const navigate = useNavigate();
  const url = "https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers";
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${url}/${deleteItemId}`);
      mutate();
    } catch (error) {
      console.log(error);
    }
    setShowConfirmModal(false);
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
              onClick={() => navigate("/admin/weathers/create")}
            >
              Tambah Informasi Cuaca
            </Button>
          </div>
          <div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && data && data.length === 0 && (
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
            {data && data.length > 0 && (
              <Table
                headers={["No", "Gambar", "Label", "Judul", "Aksi"]}
                className={"overflow-y-scroll mt-7 w-full overflow-x-hidden"}
              >
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td className="text-caption-lg">{index + 1}</td>
                    <td>
                      <img
                        src={item.gambar}
                        alt="Gambar"
                        className="w-[85px] h-[51px] mx-auto"
                      />
                    </td>
                    <td className="text-caption-lg  text-neutral-80">
                      {item.label}
                    </td>
                    <td className="text-caption-lg  text-neutral-80">
                      {item.judul}
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
            showConfirmModal ? "block" : "hidden"
          } cursor-pointer top-0 bottom-0 left-0 right-0`}
        >
          <ConfirmModal
            isOpen={showConfirmModal}
            title="Hapus Informasi cuaca"
            text="Yakin ingin menghapus informasi cuaca ini ?"
            cancelText="Tidak"
            confirmText="Ya"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            icon="info"
          />
        </div>
      </MainContainer>
    </>
  );
};

export default WeatherManagementPage;
