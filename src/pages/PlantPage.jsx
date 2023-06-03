import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import {
  Add16Filled,
  Delete20Regular,
  Eye20Regular,
  Edit20Regular,
  Filter20Filled,
} from "@fluentui/react-icons";

import MainContainer from "../components/layouts/MainContainer";
import PaginationButton from "../components/PaginationButton";
import { ConfirmModal, NotifModal } from "../components/Modal";
import Button from "../components/Button";
import TextField from "../components/TextField";
import PlantSearchEmpty from "../assets/PlantSearchEmpty.png";
import EmptyPlant from "../assets/EmptyPlant.png";

const RECIPE_PER_PAGE = 8;

const url = "https://646df4e19c677e23218ab701.mockapi.io";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function PlantPage() {
  const { data: plant, isLoading, mutate } = useSWR(`${url}/plant`, fetcher);
  const [modalPlantId, setModalPlanttId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const [filterState, setFilterState] = useState({
    isSort: false,
    currentPage: 1,
    search: "",
  });

  const handleDelete = async () => {
    setModalPlanttId(null);
    const { status } = await axios.delete(`${url}/plants/${modalPlantId}`);
    if (status === 200) {
      setAlertOpen(true);
      mutate();
    }
  };

  const { currentPage, isSort, search } = filterState;

  let filteredPlant = plant;

  filteredPlant = filteredPlant?.filter((plant) =>
    plant.name?.toLowerCase().includes(search.toLowerCase())
  );

  filteredPlant = filteredPlant?.sort((a, b) => {
    if (isSort) {
      return a.name.localeCompare(b.name);
    } else {
      return a.id - b.id;
    }
  });

  const totalPages = Math.ceil(filteredPlant?.length / RECIPE_PER_PAGE);

  filteredPlant = filteredPlant?.slice(
    (currentPage - 1) * RECIPE_PER_PAGE,
    currentPage * RECIPE_PER_PAGE
  );

  const handlePageChange = (page) => {
    setFilterState({
      ...filterState,
      currentPage: page,
    });
  };

  return (
    <MainContainer>
      <h4 className="text-h-4 font-bold mt-4">Penambahan Tanaman</h4>
      <div className="flex justify-between items-center mt-[70px]">
        <div className="flex w-[770px] justify-between items-stretch h-10">
          <div className="shrink-0 inline-flex">
            <span className="me-2 font- self-center text-caption-lg">
              Urutkan
            </span>
            <label className="swap">
              <input
                id="sortBtn"
                type="checkbox"
                className="peer"
                onClick={() => {
                  setFilterState({
                    ...filterState,
                    isSort: !isSort,
                  });
                }}
              />
              <div className="rounded-md px-[12px] py-[8px] h-[40px] border border-[#111827] text-[#111827] peer-checked:bg-primary peer-checked:text-neutral-10 peer-checked:border-transparent">
                A-Z
                <Filter20Filled className="ms-2" />
              </div>
            </label>
          </div>
          <div className="ms-3 basis-[598px] shrink">
            <TextField
              id="searchInput"
              variant="search"
              placeholder="Search"
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
          id="tambahBtn"
          to="/admin/plants/create"
        >
          <Button
            size="sm"
            className={"flex rounded-md shadow-elevation-2 px-[20px] h-[48px]"}
          >
            <Add16Filled className="me-1" />
            <span>Tambah</span>
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {filteredPlant.length > 0 ? (
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
                  "overflow-y-scroll mt-7 w-full overflow-x-hidden text-[#030712]"
                }
              >
                {filteredPlant?.map((d, index) => (
                  <tr
                    key={index}
                    className="text-center border-b border-neutral-30 text-caption-lg text-neutral-80"
                  >
                    <td className="flex justify-center">
                      <img
                        src={`${d.pict}`}
                        alt=""
                        className="w-14 h-12"
                      />
                    </td>
                    <td className="text-left ps-3">{d.name}</td>
                    <td className="max-w-[25ch] text-left px-2">
                      {d.desc.slice(0, 40)}
                    </td>
                    <td>{`${d.watering} kali sehari`}</td>
                    <td>{`${d.fertilizing} hari sekali`}</td>
                    <td className="text-caption-sm text-[#49454F]">
                      {`${d.min}`}&#8451; {`- ${d.max}`}&#8451;
                    </td>
                    <td>
                      <Eye20Regular
                        id="viewIcon"
                        className="cursor-pointer me-3 hover:text-info"
                      />
                      <Delete20Regular
                        id="deleteIcon"
                        className="cursor-pointer me-3 hover:text-info"
                        onClick={() => setModalPlanttId(d.id)}
                      />
                      <Edit20Regular
                        id="editIcon"
                        className="cursor-pointer hover:text-info"
                      />
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
      <ConfirmModal
        cancelText={"Batal"}
        confirmText={"Hapus"}
        icon={"delete"}
        isOpen={modalPlantId !== null}
        text={"Yakin hapus tanaman ini?"}
        title={"Hapus Tanaman"}
        onCancel={() => setModalPlanttId(null)}
        onConfirm={handleDelete}
      />
      <NotifModal
        icon={"success"}
        title={"Hapus Data Tanaman"}
        text={"Data tanaman berhasil dihapus"}
        onConfirm={() => setAlertOpen(false)}
        isOpen={alertOpen}
        confirmText={"Okay"}
      />
    </MainContainer>
  );
}
