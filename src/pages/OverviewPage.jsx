import Cookies from "js-cookie";
import useSWR from "swr";

import Table from "../components/Table";
import MainContainer from "../components/layouts/MainContainer";
import fetcher from "../utils/fetcher";

export default function OverviewPage() {
  const { data } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/overview`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const metricsSummary = data?.data.metrics_summary;
  const plantSummary = data?.data.plant_summary.plant;
  const weatherSummer = data?.data.weather_summary;

  return (
    <MainContainer>
      <p className="mb-4 text-body-lg">Ringkasan Metrik</p>
      <div className="flex w-full mb-6">
        <div className="border py-6 px-8 border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total User</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">
            {metricsSummary?.total_users}
          </p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Tanaman</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">
            {metricsSummary?.total_plants}
          </p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Artikel</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">
            {metricsSummary?.total_articles}
          </p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Produk</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">
            {metricsSummary?.total_products}
          </p>
        </div>
      </div>
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
                <td>{weather.temperature}</td>
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
    </MainContainer>
  );
}
