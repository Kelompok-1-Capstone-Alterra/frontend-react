import { useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import Cookies from "js-cookie";
import useSWR from "swr";
import SecondaryContainer from "../components/layouts/SecondaryContainer";

const DetailWeatherPage = () => {
  const { id } = useParams();
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/auth/admins/weathers/${id}/detail`;
  const { data, error } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );
  const weathers = data?.data;

  if (error) {
    return console.log(error);
  }

  if (!weathers) {
    return null;
  }

  return (
    <>
      <SecondaryContainer
        backTo="/admin/weathers"
        title="Data Informasi Cuaca"
        className="pe-3">
        <div className="px-8 mb-[8px]">
          <p
            className="text-h-5 font-bold mb-3"
            id={`detail-title-${weathers.id}`}>
            {weathers.weather_title}
          </p>
          <img
            src={`https://34.128.85.215:8080/pictures/${weathers.weather_pictures[0]}`}
            alt="Gambar Cuaca"
            className="w-[262px] h-36 mb-3"
            id={`detail-image-${weathers.id}`}
          />
          <div
            className="styled-content"
            id={`detail-description-${weathers.id}`}
            dangerouslySetInnerHTML={{
              __html: weathers.weather_description,
            }}></div>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default DetailWeatherPage;
