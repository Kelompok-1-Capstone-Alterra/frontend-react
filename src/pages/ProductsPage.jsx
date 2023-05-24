import TextField from "../components/TextField";
import Button from "../components/Button";

export default function ProductsPage() {
  return (
    <>
      <div className="w-full">
        <h4 className="text-h-4 font-bold lg:mt-[78px] lg:ms-7">Produk</h4>
        <div className="px-16 mt-6 mb-16">
          <div className="flex w-full items-center justify-between mt-6">
            <TextField
              label={"Nama Produk"}
              className={"w-full"}
              placeholder={"Ketik Kata Kunci"}
            />
            <Button
              size="sm"
              className={"rounded-md px-4 mt-6 ms-5"}
            >
              Cari
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
