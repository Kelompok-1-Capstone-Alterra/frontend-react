import Table from "../components/Table";
import MainContainer from "../components/layouts/MainContainer";

export default function OverviewPage() {
  return (
    <MainContainer>
      <p className="mb-4 text-body-lg">Ringkasan Metrik</p>
      <div className="flex w-full mb-6">
        <div className="border py-6 px-8 border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total User</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">234</p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Tanaman</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">32</p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Artikel</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">342</p>
        </div>
        <div className="border-t py-6 px-8 border-r border-b border-neutral-30 flex-1 h-[120px]">
          <p className="text-body-sm text-neutral-60">Total Produk</p>
          <p className="text-[#030712] font-bold text-h-4 text-end">543</p>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex-1">
          <p className="mb-4 text-body-lg">Ringkasan Cuaca</p>
          <Table
            headers={["Lokasi", "Suhu", "Cuaca"]}
            className={"w-full"}
          >
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Bandung</td>
              <td>23 C</td>
              <td>Cerah</td>
            </tr>
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Bandung</td>
              <td>23 C</td>
              <td>Cerah</td>
            </tr>
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Bandung</td>
              <td>23 C</td>
              <td>Cerah</td>
            </tr>
          </Table>
        </div>
        <div className="flex-1">
          <p className="mb-4 text-body-lg">Ringkasan Tanaman</p>
          <Table
            headers={["Tanaman", "Jumlah User"]}
            className={"w-full"}
          >
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Tomat</td>
              <td>4</td>
            </tr>
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Tomat</td>
              <td>4</td>
            </tr>
            <tr className="text-center border-b text-caption-lg text-neutral-80">
              <td className="py-4">Tomat</td>
              <td>4</td>
            </tr>
          </Table>
        </div>
      </div>
    </MainContainer>
  );
}
