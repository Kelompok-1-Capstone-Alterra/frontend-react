import { useLoaderData, Navigate } from "react-router-dom";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { toRupiah } from "../utils/functions";

export default function DetailProductPage() {
  const product = useLoaderData();
  console.log(product);
  return (
    <>
      {!product && <Navigate to="/admin/products" />}
      <SecondaryContainer
        backTo="/admin/products"
        title="Data Produk"
      >
        <div className="ps-10">
          <p className="font-semibold text-h-5">
            {product.name}{" "}
            <span
              className={`badge align-middle text-white ${
                product.status ? "badge-primary" : "badge-warning"
              }`}
            >
              {product.status ? "Etalase" : "Arsip"}
            </span>
          </p>
          <div className="flex my-4 gap-5">
            <img
              src={"http://via.placeholder.com/130x130"}
              alt="gambar"
              className="w-[130px] h-[130px]"
            />
          </div>
          <p className="text-error font-semibold mb-5">
            {toRupiah(product.price)}
          </p>
          <p className="text-body-lg font-bold mb-3">Spesifikasi:</p>
          <div className="grid grid-cols-3 gap-3 w-1/2 mb-4">
            <div>
              <p className="text-body-sm font-semibold">Kategori:</p>
              <p className="text-body-sm">{product.category}</p>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Merek:</p>
              <p className="text-body-sm">{product.brand}</p>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Isi:</p>
              <p className="text-body-sm">
                {product.unit ? product.unit : "-"} Pcs
              </p>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Berat:</p>
              <p className="text-body-sm">{product.weight} Gram</p>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Wujud:</p>
              <p className="text-body-sm">
                {product.form ? product.form : "-"}
              </p>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Condition:</p>
              <p className="text-body-sm">{product.condition}</p>
            </div>
          </div>
          <p className="text-body-lg font-bold mb-3">Deskripsi:</p>
          <div
            className="styled-content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>

          <p className="text-body-lg font-bold mt-4 mb-3">Seller:</p>
          <div>
            <p className="text-body-sm">
              <span className="font-semibold">Nama: </span>
              {product.sellerName}
            </p>
          </div>
          <div>
            <p className="text-body-sm">
              <span className="font-semibold">Nomor Whatsapp: </span>
              {product.sellerPhone}
            </p>
          </div>
        </div>
      </SecondaryContainer>
    </>
  );
}
