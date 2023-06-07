import { useLoaderData, Navigate } from "react-router-dom";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { toRupiah } from "../utils/functions";

export default function DetailProductPage() {
  const product = useLoaderData();

  if (product === null) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <SecondaryContainer
      backTo="/admin/products"
      title="Data Produk"
    >
      <div className="ps-10">
        <p className="font-semibold text-h-5">
          {product.product_name}{" "}
          <span
            className={`badge align-middle text-white ${
              product.product_status ? "badge-primary" : "badge-warning"
            }`}
          >
            {product.product_status ? "Etalase" : "Arsip"}
          </span>
        </p>
        <div className="flex my-4 gap-5">
          {product.product_pictures.map((image) => (
            <img
              key={product.product_id}
              src={`${import.meta.env.VITE_API_BASE_URL}/pictures/${image}`}
              alt="gambar"
              className="w-[130px] h-[130px]"
            />
          ))}
        </div>
        <p className="text-error font-semibold mb-5">
          {toRupiah(product.product_price)}
        </p>
        <p className="text-body-lg font-bold mb-3">Spesifikasi:</p>
        <div className="grid grid-cols-3 gap-3 w-1/2 mb-4">
          <div>
            <p className="text-body-sm font-semibold">Kategori:</p>
            <p className="text-body-sm">{product.product_category}</p>
          </div>
          <div>
            <p className="text-body-sm font-semibold">Merek:</p>
            <p className="text-body-sm">{product.product_brand}</p>
          </div>
          <div>
            <p className="text-body-sm font-semibold">Isi:</p>
            <p className="text-body-sm">
              {product.product_unit ? product.product_unit : "-"} Pcs
            </p>
          </div>
          <div>
            <p className="text-body-sm font-semibold">Berat:</p>
            <p className="text-body-sm">{product.product_weight} Gram</p>
          </div>
          <div>
            <p className="text-body-sm font-semibold">Wujud:</p>
            <p className="text-body-sm">
              {product.product_form ? product.product_form : "-"}
            </p>
          </div>
          <div>
            <p className="text-body-sm font-semibold">Condition:</p>
            <p className="text-body-sm">{product.product_condition}</p>
          </div>
        </div>
        <p className="text-body-lg font-bold mb-3">Deskripsi:</p>
        <div
          className="styled-content"
          dangerouslySetInnerHTML={{ __html: product.product_description }}
        ></div>

        <p className="text-body-lg font-bold mt-4 mb-3">Seller:</p>
        <div>
          <p className="text-body-sm">
            <span className="font-semibold">Nama: </span>
            {product.product_seller_name}
          </p>
        </div>
        <div>
          <p className="text-body-sm">
            <span className="font-semibold">Nomor Whatsapp: </span>
            {product.product_seller_phone}
          </p>
        </div>
      </div>
    </SecondaryContainer>
  );
}
