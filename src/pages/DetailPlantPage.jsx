import { useState } from "react";
import Tab from "../components/Tab";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import DetailTanamanView from "../components/detailPlantPage/DetailTanamanView";
import PenanamanView from "../components/detailPlantPage/PenanamanView";
import PemupukkanView from "../components/detailPlantPage/PemupukkanView";
import PenyiramanView from "../components/detailPlantPage/PenyiramanView";
import TemperaturView from "../components/detailPlantPage/TemperaturView";

export default function DetailPlantPage() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = [
    {
      id: "detailTanaman",
      title: "Detail Tanaman",
      content: <DetailTanamanView />,
    },
    {
      id: "penanaman",
      title: "Penanaman",
      content: <PenanamanView />,
    },
    {
      id: "pemupukkan",
      title: "Pemupukkan",
      content: <PemupukkanView />,
    },
    {
      id: "penyiraman",
      title: "Penyiraman",
      content: <PenyiramanView />,
    },
    {
      id: "temperatur",
      title: "Temperatur",
      content: <TemperaturView />,
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
