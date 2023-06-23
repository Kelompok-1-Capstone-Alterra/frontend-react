import { useParams } from "react-router-dom";
import { useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";

import Tab from "../components/Tab";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import DetailTanamanView from "../components/detailPlantPage/DetailTanamanView";
import PenanamanView from "../components/detailPlantPage/PenanamanView";
import PemupukkanView from "../components/detailPlantPage/PemupukkanView";
import PenyiramanView from "../components/detailPlantPage/PenyiramanView";
import TemperaturView from "../components/detailPlantPage/TemperaturView";
import fetcher from "../utils/fetcher";
import Loading from "../components/Loading";

export default function DetailPlantPage() {
  const param = useParams();
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/plants/${
      param.id
    }/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );
  const plant = data?.data;

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      id: "detailTanaman",
      title: "Detail Tanaman",
      content: (
        <DetailTanamanView
          plantDetail={{
            plant_name: plant?.plant_name,
            plant_latin: plant?.plant_latin,
            plant_description: plant?.plant_description,
            plant_pictures: plant?.plant_pictures,
          }}
        />
      ),
    },
    {
      id: "penanaman",
      title: "Penanaman",
      content: <PenanamanView plantPlanting={plant?.planting_info} />,
    },
    {
      id: "pemupukkan",
      title: "Pemupukkan",
      content: <PemupukkanView plantFertilizing={plant?.fertilizing_info} />,
    },
    {
      id: "penyiraman",
      title: "Penyiraman",
      content: <PenyiramanView plantWatering={plant?.watering_info} />,
    },
    {
      id: "temperatur",
      title: "Temperatur",
      content: <TemperaturView plantTemperature={plant?.temperature_info} />,
    },
  ];

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <SecondaryContainer
      title="Data Tanaman"
      backTo="/admin/plants"
    >
      <div className="ps-10">
        <Tab
          tabs={tabs}
          setActiveTabIndex={setActiveTabIndex}
          activeTabIndex={activeTabIndex}
        />
      </div>
    </SecondaryContainer>
  );
}
