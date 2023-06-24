import { useParams, Navigate } from "react-router-dom";
import SecondaryContainer from "../../components/layouts/SecondaryContainer";
import { useState } from "react";
import { toRupiah } from "../../utils/functions";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";
import ImageOverlay from "../../components/ImageOverlay";

export default function DetailProductPage() {
  const { id } = useParams();
  const [imageOverlay, setImageOverlay] = useState(null);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${id}/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const product = data?.data;

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (error) return <Navigate to="/admin/products" />;

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
            <div
              className="h-[130px] w-[130px]"
              key={image}
            >
              <ImageWithSkeleton
                className={`cursor-pointer w-full h-full object-cover`}
                src={`${import.meta.env.VITE_API_BASE_URL}/pictures/${image}`}
                alt="gambar"
                width={130}
                height={130}
                onClick={() => setImageOverlay(image)}
              />
            </div>
          ))}
        </div>
        <p className="text-error font-semibold mb-5">
          {toRupiah(product.product_price)}
        </p>
        <p className="text-body-lg font-bold mb-3">Spesifikasi:</p>
        <div className="grid grid-cols-3 gap-x-5 gap-y-2 w-1/2 mb-4">
          <div>
            <span className="text-body-sm font-semibold">Kategori: </span>
            <span className="text-body-sm">{product.product_category}</span>
          </div>
          <div>
            <span className="text-body-sm font-semibold">Merek: </span>
            <span className="text-body-sm">{product.product_brand}</span>
          </div>
          <div>
            <span className="text-body-sm font-semibold">Isi: </span>
            <span className="text-body-sm">
              {product.product_unit ? product.product_unit : "-"} Pcs
            </span>
          </div>
          <div>
            <span className="text-body-sm font-semibold">Berat: </span>
            <span className="text-body-sm">{product.product_weight} Gram</span>
          </div>
          <div>
            <span className="text-body-sm font-semibold">Wujud: </span>
            <span className="text-body-sm">
              {product.product_form ? product.product_form : "-"}
            </span>
          </div>
          <div>
            <span className="text-body-sm font-semibold">Condition: </span>
            <span className="text-body-sm">{product.product_condition}</span>
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
            <span className="font-semibold">Nomor: </span>
            {product.product_seller_phone}
          </p>
        </div>
      </div>
      {imageOverlay && (
        <ImageOverlay
          isOpen={imageOverlay}
          image={`${
            import.meta.env.VITE_API_BASE_URL
          }/pictures/${imageOverlay}`}
          alt="gambar"
          onClose={() => setImageOverlay(null)}
        />
      )}
    </SecondaryContainer>
  );
}
