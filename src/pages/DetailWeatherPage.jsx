import { useParams } from "react-router-dom";
import fetcher from "../utils/fetcher";
import Cookies from "js-cookie";
import useSWR from "swr";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import Loading from "../components/Loading";

const DetailWeatherPage = () => {
  const { id } = useParams();
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/auth/admins/weathers/${id}/detail`;
  const { data, isLoading } = useSWR(url, async (url) =>
    fetcher(url, Cookies.get("token"))
  );
  const weathers = data?.data;

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );
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
          <ImageWithSkeleton
            src={`https://34.128.85.215:8080/pictures/${weathers.weather_pictures[0]}`}
            alt="Gambar Cuaca"
            width={262}
            height={36}
            id={`detail-image-${weathers.id}`}
            className="mb-3"
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
