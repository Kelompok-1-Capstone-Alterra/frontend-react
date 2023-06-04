import { useParams } from "react-router-dom";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetailArticle() {
  const [artikelList, setArtikelList] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
      .then((response) => {
        setArtikelList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <SecondaryContainer
        backTo="/admin/articles"
        title="Tambah Artikel"
        className={"pe-3 pl-[81px]"}
      >
        <div className="mb-[8px]">
          <label className="flex text-body-lg font-bold mb-3">
            Judul Artikel
          </label>
          <div className="w-[1037px]">{artikelList.name}</div>
        </div>
        <div className="pb-4">
          <label className="flex text-body-lg font-bold mb-3">Deskripsi</label>
          <div
            className="styled-content"
            dangerouslySetInnerHTML={{ __html: artikelList.description }}
          ></div>
        </div>
        <div className="pb-4">
          <label className="flex text-body-lg font-bold mb-3">
            Gambar Tanaman
          </label>
          <img
            src={artikelList.image}
            alt=""
            className="w-[153px] h-[87px]"
          />
        </div>
      </SecondaryContainer>
    </>
  );
}
