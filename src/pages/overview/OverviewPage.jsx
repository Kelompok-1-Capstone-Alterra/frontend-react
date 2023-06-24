import Cookies from "js-cookie";
import useSWR from "swr";
import AnimatedNumbers from "react-animated-numbers";
import Skeleton from "react-loading-skeleton";

import Table from "../../components/Table";
import MainContainer from "../../components/layouts/MainContainer";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";

export default function OverviewPage() {
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/overview`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const metricsSummary = data?.data.metrics_summary;
  const plantSummary = data?.data.plant_summary.plant.slice(0, 10);
  const weatherSummer = data?.data.weather_summary.slice(0, 10);

  return (
    <MainContainer>
      <p className="mb-4 text-body-lg">Ringkasan Metrik</p>
      <div className="flex w-full mb-6">
        <div className="border py-6 px-8 border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total User</p>
          <div className="text-[#030712] font-bold text-h-4 text-end ms-auto block max-w-max">
            {metricsSummary?.total_users !== undefined ? (
              <AnimatedNumbers
                animateToNumber={metricsSummary?.total_users}
                configs={(_, index) => {
                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                }}
              ></AnimatedNumbers>
            ) : (
              <Skeleton width={40} />
            )}
          </div>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Tanaman</p>
          <div className="text-[#030712] font-bold text-h-4 text-end ms-auto block max-w-max">
            {metricsSummary?.total_plants !== undefined ? (
              <AnimatedNumbers
                animateToNumber={metricsSummary?.total_plants}
                configs={(_, index) => {
                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                }}
              ></AnimatedNumbers>
            ) : (
              <Skeleton width={40} />
            )}
          </div>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Artikel</p>
          <div className="text-[#030712] font-bold text-h-4 text-end ms-auto block max-w-max">
            {metricsSummary?.total_articles !== undefined ? (
              <AnimatedNumbers
                animateToNumber={metricsSummary?.total_articles}
                configs={(_, index) => {
                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                }}
              ></AnimatedNumbers>
            ) : (
              <Skeleton width={40} />
            )}
          </div>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Produk</p>
          <div className="text-[#030712] font-bold text-h-4 text-end ms-auto block max-w-max">
            {metricsSummary?.total_products !== undefined ? (
              <AnimatedNumbers
                animateToNumber={metricsSummary?.total_products}
                configs={(_, index) => {
                  return { mass: 1, tension: 230 * (index + 1), friction: 140 };
                }}
              ></AnimatedNumbers>
            ) : (
              <Skeleton width={40} />
            )}
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full gap-3">
          <div className="flex-1">
            <p className="mb-4 text-body-lg">Ringkasan Cuaca</p>
            <Table
              headers={["Lokasi", "Suhu", "Cuaca"]}
              className={"w-full"}
            >
              {weatherSummer?.map((weather, index) => (
                <tr
                  key={index}
                  className="text-center border-b text-caption-lg text-neutral-80"
                >
                  <td className="py-4">{weather.location}</td>
                  <td>{weather.temperature} &#8451;</td>
                  <td>{weather.label}</td>
                </tr>
              ))}
            </Table>
          </div>
          <div className="flex-1">
            <p className="mb-4 text-body-lg">Ringkasan Tanaman</p>
            <Table
              headers={["Tanaman", "Jumlah User"]}
              className={"w-full"}
            >
              {plantSummary?.map((plant, index) => (
                <tr
                  key={index}
                  className="text-center border-b text-caption-lg text-neutral-80"
                >
                  <td className="py-4">{plant.plant_name}</td>
                  <td>{plant.total_users}</td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      )}
    </MainContainer>
  );
}
