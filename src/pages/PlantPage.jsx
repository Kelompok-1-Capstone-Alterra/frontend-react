import { useState } from "react";
import useSWR from "swr";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import {
  Add16Filled,
  Delete20Regular,
  Eye20Regular,
  Edit20Regular,
  Filter20Filled,
} from "@fluentui/react-icons";
import { useResetRecoilState } from "recoil";
import Cookies from "js-cookie";

import MainContainer from "../components/layouts/MainContainer";
import PaginationButton from "../components/PaginationButton";
import { ConfirmModal, NotifModal } from "../components/Modal";
import Button from "../components/Button";
import TextField from "../components/TextField";
import PlantSearchEmpty from "../assets/PlantSearchEmpty.png";
import EmptyPlant from "../assets/EmptyPlant.png";
import useDebounce from "../hooks/useDebounce";
import fetcher from "../utils/fetcher";
import usePlant from "../hooks/usePlant";
import { addPlantDataState } from "../utils/recoil_atoms";
import Loading from "../components/Loading";
import ImageOverlay from "../components/ImageOverlay";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

const PLANT_PER_PAGE = 8;
const DEBOUNCE_DELAY = 500;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PlantPage() {
  const [filterState, setFilterState] = useState({
    isSort: false,
    currentPage: 1,
    search: "",
  });
  const debouncedKeyword = useDebounce(filterState.search, DEBOUNCE_DELAY);
  const { data, isLoading, mutate } = useSWR(
    debouncedKeyword
      ? `${BASE_URL}/auth/admins/plants/search?keyword=${debouncedKeyword}`
      : `${BASE_URL}/auth/admins/plants`,
    (url) => fetcher(url, Cookies.get("token"))
  );
  const [modalDelete, setModalDelete] = useState(false);
  const resetAddPlantData = useResetRecoilState(addPlantDataState);
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
  const { deletePlant } = usePlant();

  const handleDelete = async (id) => {
    setModalDelete(false);
    const response = await deletePlant(id);

    if (filteredPlant.length === 1 && currentPage > 1) {
      setFilterState((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }

    if (response.status !== 200) {
      setShowModal({
        show: true,
        icon: "info",
        text: "Data tanaman kamu gagal dihapus",
        title: "Aksi Gagal",
      });
      return;
    }

    setShowModal({
      show: true,
      icon: "success",
      text: "Data tanaman berhasil dihapus",
      title: "Hapus Data Tanaman",
    });
    mutate();
  };

  const { currentPage, isSort, search } = filterState;

  let totalPlant = data?.data?.length;
  let filteredPlant = data?.data;

  filteredPlant = filteredPlant?.sort((a, b) => {
    if (isSort) {
      return a.Name.localeCompare(b.Name);
    } else {
      return a.ID - b.ID;
    }
  });

  const totalPages = Math.ceil(filteredPlant?.length / PLANT_PER_PAGE);

  filteredPlant = filteredPlant?.slice(
    (currentPage - 1) * PLANT_PER_PAGE,
    currentPage * PLANT_PER_PAGE
  );

  const handlePageChange = (page) => {
    setFilterState({
      ...filterState,
      currentPage: page,
    });
  };

  return (
    <MainContainer>
      <h4 className="text-h-4 font-bold">Penambahan Tanaman</h4>
      <div className="flex justify-between items-center mt-[70px] mb-7">
        <div className="flex w-[770px] justify-between items-stretch h-10">
          <div className="shrink-0 inline-flex">
            <span className="me-2 font- self-center text-caption-lg">
              Urutkan
            </span>
            <label className="swap">
              <input
                id="sortBtnInput"
                type="checkbox"
                className="peer"
                onClick={() => {
                  setFilterState({
                    ...filterState,
                    isSort: !isSort,
                  });
                }}
              />
              <div
                id="sortBtn"
                className="rounded-md px-[12px] py-[8px] h-[40px] border border-[#111827] text-[#111827] peer-checked:bg-primary peer-checked:text-neutral-10 peer-checked:border-transparent"
              >
                A-Z
                <Filter20Filled className="ms-2" />
              </div>
            </label>
          </div>
          <div className="ms-3 basis-[598px] shrink">
            <TextField
              id="searchInput"
              type="search"
              variant="search"
              placeholder="Search"
              className={"pe-2"}
              onChange={(e) => {
                setFilterState({
                  ...filterState,
                  search: e.target.value,
                  currentPage: 1,
                });
              }}
            />
          </div>
        </div>
        <Link
          id="tambahLink"
          to="/admin/plants/create"
        >
          <Button
            id="tambahBtn"
            size="sm"
            className={"flex rounded-md shadow-elevation-2 px-[20px] h-[48px]"}
            onClick={() => {
              if (localStorage.getItem("plantFormDraft") === null) {
                resetAddPlantData();
              }
            }}
          >
            <Add16Filled className="me-1" />
            <span>Tambah</span>
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {totalPlant > 0 ? (
            <>
              <Table
                headers={[
                  "Gambar",
                  "Nama Tanaman",
                  "Deskripsi",
                  "Penyiraman",
                  "Pemupukan",
                  "Temperature",
                  "Aksi",
                ]}
                className={
                  "overflow-y-scroll w-full overflow-x-hidden text-[#030712]"
                }
              >
                {filteredPlant?.map((plant, index) => (
                  <tr
                    key={index}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td className="flex justify-center">
                      <div className="w-[56px] h-[48px]">
                        <ImageWithSkeleton
                          id="gambarTanaman"
                          src={
                            plant.Pictures.length > 0
                              ? `${BASE_URL}/pictures/${plant.Pictures[0]?.url}`
                              : undefined
                          }
                          width={56}
                          height={48}
                          alt="Gambar Tanaman"
                          className="cursor-pointer w-full h-full object-cover"
                          onClick={() =>
                            setImageOverlay({
                              isOpen: true,
                              image: `https://34.128.85.215:8080/pictures/${plant.Pictures[0]?.url}`,
                            })
                          }
                        />
                      </div>
                    </td>
                    <td className="text-left ps-3">
                      {plant.Name} ({plant.Latin})
                    </td>
                    <td className="max-w-[25ch] text-left px-2">
                      <div className=" line-clamp-2">
                        {plant.Description.replace(/<(.|\n)*?>/g, "")}
                      </div>
                    </td>
                    <td>{`${plant.Watering} kali sehari`}</td>
                    <td>{`${plant.Fertilizing} hari sekali`}</td>
                    <td className="text-caption-sm text-[#49454F]">
                      {`${plant.Min}`}&#8451; {`- ${plant.Max}`}&#8451;
                    </td>
                    <td>
                      <Link
                        id={`viewIconLink${plant.ID}`}
                        to={`/admin/plants/${plant.ID}`}
                      >
                        <Eye20Regular
                          id={`viewIcon${plant.ID}`}
                          className="cursor-pointer me-3 hover:text-info"
                        />
                      </Link>
                      <Delete20Regular
                        id={`deleteIcon${plant.ID}`}
                        className="cursor-pointer me-3 hover:text-info"
                        onClick={() => setModalDelete(plant.ID)}
                      />
                      <Link
                        id={`editIconLink${plant.ID}}`}
                        to={`/admin/plants/update/${plant.ID}`}
                      >
                        <Edit20Regular
                          id={`editIcon${plant.ID}}`}
                          className="cursor-pointer hover:text-info"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </Table>
              <div className="flex mt-[53px] w-full justify-center">
                <PaginationButton
                  currentPage={currentPage}
                  totalPages={filteredPlant?.length > 0 ? totalPages : 1}
                  handlePageChange={handlePageChange}
                />
              </div>
            </>
          ) : filteredPlant <= 0 && search ? (
            <>
              <div className="flex flex-col items-center justify-center mt-44">
                <img
                  src={PlantSearchEmpty}
                  alt="empty search product"
                  id="empty-search"
                  className="w-[25%]"
                />
                <p className="text-body-lg text-[#6B7280] mt-4">
                  Tanaman yang kamu cari tidak ada
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center mt-44">
                <img
                  src={EmptyPlant}
                  alt="empty plant"
                  id="empty-plant"
                  className="w-[25%]"
                />
                <p className="text-body-lg text-[#6B7280] mt-4">
                  Kamu belum menambahkan tanaman
                </p>
              </div>
            </>
          )}
        </>
      )}
      <ImageOverlay
        image={imageOverlay.image}
        isOpen={imageOverlay.isOpen}
        onClose={() => setImageOverlay({ isOpen: false, image: null })}
      />
      <ConfirmModal
        cancelText={"Tidak"}
        confirmText={"Ya"}
        icon={"delete"}
        isOpen={modalDelete ? true : false}
        text={"Yakin ingin menghapus data tanaman ini?"}
        title={"Konfirmasi Hapus Data Tanaman"}
        onCancel={() => setModalDelete(false)}
        onConfirm={() => handleDelete(modalDelete)}
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
    </MainContainer>
  );
}
