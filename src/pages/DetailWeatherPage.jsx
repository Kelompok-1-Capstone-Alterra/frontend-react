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
        title="Preview Informasi Cuaca"
        className="pe-3">
        <div className="px-10 mb-[8px]">
          <p className="text-h-5 font-bold mb-5">{weathers.weather_title}</p>
          <div
            className="styled-content"
            dangerouslySetInnerHTML={{
              __html: weathers.weather_description,
            }}></div>
        </div>
      </SecondaryContainer>
    </>
  );
};

export default DetailWeatherPage;
