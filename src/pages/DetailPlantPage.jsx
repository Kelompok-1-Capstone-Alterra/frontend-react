import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import Tab from "../components/Tab";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import DetailTanamanView from "../components/detailPlantPage/DetailTanamanView";
import PenanamanView from "../components/detailPlantPage/PenanamanView";
import PemupukkanView from "../components/detailPlantPage/PemupukkanView";
import PenyiramanView from "../components/detailPlantPage/PenyiramanView";
import TemperaturView from "../components/detailPlantPage/TemperaturView";

export default function DetailPlantPage() {
  const plants = useLoaderData();
  console.log(plants);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      id: "detailTanaman",
      title: "Detail Tanaman",
      content: (
        <DetailTanamanView
          plantDetail={{
            plant_name: plants?.plant_name,
            plant_latin: plants?.plant_latin,
            plant_description: plants?.plant_description,
            plant_pictures: plants?.plant_pictures,
          }}
        />
      ),
    },
    {
      id: "penanaman",
      title: "Penanaman",
      content: <PenanamanView plantPlanting={plants?.planting_info} />,
    },
    {
      id: "pemupukkan",
      title: "Pemupukkan",
      content: <PemupukkanView plantFertilizing={plants?.fertilizing_info} />,
    },
    {
      id: "penyiraman",
      title: "Penyiraman",
      content: <PenyiramanView plantWatering={plants?.watering_info} />,
    },
    {
      id: "temperatur",
      title: "Temperatur",
      content: <TemperaturView plantTemperature={plants?.temperature_info} />,
    },
  ];

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
