import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import { ChevronLeft48Regular } from "@fluentui/react-icons";
import SecondaryContainer from "../components/layouts/SecondaryContainer";

const DetailWeatherPage = () => {
  const { id } = useParams();
  const url = `https://642cdf18bf8cbecdb4f8b260.mockapi.io/weathers/${id}`;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: weatherData, error } = useSWR(url, fetcher);

  if (error) {
    return console.log(error);
  }

  if (!weatherData) {
    return null;
  }

  const { judul, deskripsi } = weatherData;

  return (
    <>
      <SecondaryContainer
        backTo="/admin/weathers"
        title="Preview Informasi Cuaca"
        className="pe-3">
        <div className="mx-5">
          <p className="text-h-5 font-bold mb-5">{judul}</p>
          <div
            className="styled-content"
            dangerouslySetInnerHTML={{ __html: deskripsi }}></div>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default DetailWeatherPage;
