import React, { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import axios from "axios";
import useSWR from "swr";
import image from "../assets/illustrasi.png";
import {
  Eye24Regular,
  Delete24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/Modal";
import MainContainer from "../components/layouts/MainContainer";

const WeatherManagementPage = () => {
  const navigate = useNavigate();
  const url = "https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers";
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(url, fetcher);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${url}/${deleteItemId}`);
      mutate(url);
    } catch (error) {
      console.log(error);
    }
    setShowConfirmModal(false);
    window.location.reload();
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
              children="Unggah Informasi Cuaca"
              size="lg"
              className="px-4"
              onClick={() => navigate("/admin/weathers/create")}
            />
          </div>
          <div>
            {data && data.length > 0 ? (
              <Table
                headers={["No", "Gambar", "Label", "Judul", "Aksi"]}
                className={"overflow-y-scroll mt-7 w-full overflow-x-hidden"}>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-b border-neutral-30 px-2 h-14">
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center">
                        <img src={item.gambar} alt="Gambar" className="h-14" />
                      </div>
                    </td>
                    <td>{item.label}</td>
                    <td>{item.judul}</td>
                    <td className="space-x-2">
                      <Eye24Regular
                        onClick={() => navigate(`/admin/weathers/${item.id}`)}
                        className="cursor-pointer hover:text-info"
                      />
                      <Delete24Regular
                        onClick={() => handleDelete(item.id)}
                        className="cursor-pointer hover:text-info"
                      />
                      <Edit24Regular
                        className="cursor-pointer hover:text-info"
                        onClick={() =>
                          navigate(`/admin/weathers/update/${item.id}`)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center h-screen">
                  <div>
                    <img src={image} alt="gambar" />
                  </div>
                  <p className=" text-body-lg text-[#637381]">
                    Informasi cuaca masih kosong
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </MainContainer>
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          showConfirmModal ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}>
        <ConfirmModal
          isOpen={showConfirmModal}
          title="Hapus Informasi cuaca"
          text="Yakin ingin menghapus informasi cuaca ini ?"
          cancelText="Batal"
          confirmText="Hapus"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </>
  );
};

export default WeatherManagementPage;
