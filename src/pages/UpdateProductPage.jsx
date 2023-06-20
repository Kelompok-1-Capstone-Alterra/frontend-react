import {
  DismissCircle28Filled,
  Image24Regular,
  Info12Regular,
} from "@fluentui/react-icons";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { NotifModal, ConfirmModal } from "../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import MySelect from "../components/MySelect";
import TextFieldGroup from "../components/TextFieldGroup";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import ReactQuill from "react-quill";
import { MODULES } from "../constants";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import useImage from "../hooks/useImage";
import useProduct from "../hooks/useProduct";
// import axios from "axios";
import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import Loading from "../components/Loading";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import ImageOverlay from "../components/ImageOverlay";

const options = [
  { value: "Alat Tani", label: "Alat Tani" },
  { value: "Bibit", label: "Bibit" },
  { value: "Pestisida", label: "Pestisida" },
  { value: "Pupuk", label: "Pupuk" },
];

export default function UpdateProductPage() {
  // const product = useLoaderData();
  const { id } = useParams();

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/products/${id}/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const product = data?.data;

  const defaultOption = options.find(
    (option) => option.value === product?.product_category
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    clearErrors,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [editorFocus, setEditorFocus] = useState(false);
  let editorContent = watch("description");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const defaultPictures = product?.product_pictures.map(
    (pic) => `${import.meta.env.VITE_API_BASE_URL}/pictures/${pic}`
  );
  const [pictures, setPictures] = useState([]);
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });
  const { uploadImage, getImage, isLoading: imageLoading } = useImage();
  const { updateProduct, isLoading: uploadLoading } = useProduct();
  const [imageOverlay, setImageOverlay] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    register("description", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  useEffect(() => {
    if (product) {
      reset({
        name: product?.product_name,
        category: defaultOption,
        status: product?.product_status ? "etalase" : "arsip",
        price: product?.product_price,
        unit: product?.product_unit,
        brand: product?.product_brand,
        weight: product?.product_weight,
        condition: product?.product_condition,
        form: product?.product_form,
        sellerName: product?.product_seller_name,
        sellerPhone: product?.product_seller_phone.substring(1),
      });
      setValue("description", product?.product_description);
    }
    setValue("description", product?.product_description);
  }, [product, setValue]);

  const onEditorStateChange = (editorState) => {
    setValue("description", editorState);
    trigger("description");
  };

  const saveProduct = async (data) => {
    let newPictures = [];
    if (data.picture.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < data.picture.length; i++) {
        formData.append("pictures", data.picture[i]);
      }
      const responseUpload = await uploadImage(formData);
      if (responseUpload.status !== 200) {
        setNotifModal({
          show: true,
          icon: "info",
          title: "Aksi Gagal",
          text: "Data produk kamu gagal diubah",
        });
        return;
      }
      const urlsArray = responseUpload?.data?.urls;
      newPictures = urlsArray.map((url) => {
        return { url };
      });
    } else {
      try {
        const promises = product?.product_pictures.map(async (pic) => {
          const response = await getImage(pic);
          const blob = await response.data;
          const file = new File([blob], pic, { type: blob.type });
          const formData = new FormData();
          formData.append("pictures", file);
          const responseUpload = await uploadImage(formData);
          if (responseUpload.status !== 200) {
            setNotifModal({
              show: true,
              icon: "info",
              title: "Aksi Gagal",
              text: "Data produk kamu gagal diubah",
            });
            return;
          }
          return responseUpload?.data?.urls[0];
        });
        const results = await Promise.all(promises);
        newPictures = results.map((result) => {
          return { url: result };
        });
      } catch (err) {
        setNotifModal({
          show: true,
          icon: "info",
          title: "Aksi Gagal",
          text: "Data produk kamu gagal diubah",
        });
        return;
      }
    }
    //update the product
    const res = await updateProduct(product?.id, {
      product_pictures: newPictures,
      product_name: data.name,
      product_category: data.category.value,
      product_description: data.description,
      product_price: Number(data.price),
      product_status: Boolean(data.status === "etalase"),
      product_brand: data.brand,
      product_condition: data.condition,
      product_unit: Number(data.unit),
      product_weight: Number(data.weight),
      product_form: data.form,
      product_seller_name: data.sellerName,
      product_seller_phone: `+${data.sellerPhone}`,
      category: data.category.value,
      status: data.status === "etalase" ? true : false,
    });

    if (res.status !== 200) {
      setNotifModal({
        show: true,
        icon: "info",
        title: "Aksi Gagal",
        text: "Data produk kamu gagal diubah",
      });
      return;
    }

    setNotifModal({
      show: true,
      icon: "success",
      title: "Ubah Data Produk",
      text: "Data produk berhasil diubah",
    });
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

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
      title="Edit Produk"
      className={"pe-3"}
    >
      <div className="mx-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:mt-8 border w-full border-neutral-40 rounded-md">
            <div className="p-7">
              <h6 className="text-h-6 font-bold">Informasi Produk</h6>
              <div className="flex flex-col my-5">
                <p className="font-semibold text-body-s mb-2.5">Foto Produk</p>
                <div>
                  <div className="flex items-center gap-5">
                    <div>
                      <label
                        id="image-input-label"
                        htmlFor="picture-input"
                        className={`cursor-pointer w-[132px] h-[132px] border ${
                          errors?.picture
                            ? "border-error text-error"
                            : "border-neutral-40 text-neutral-40 "
                        } flex flex-col justify-center items-center text-center p-5 text-body-sm`}
                      >
                        <Image24Regular />
                        Tambahkan Foto (
                        {pictures?.length
                          ? pictures.length
                          : defaultPictures.length}
                        /5)
                      </label>
                      <input
                        type="file"
                        id="picture-input"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                        {...register("picture", {
                          validate: (value) => {
                            if (value === null) return true;
                            const files = Array.from(value);
                            if (files.length > 5) {
                              return "Gambar produk tidak boleh lebih dari 5";
                            }

                            return true;
                          },
                          onChange: (e) => {
                            const files = Array.from(e.target.files);
                            const urls = files.map((file) =>
                              URL.createObjectURL(file)
                            );
                            setPictures(urls);
                          },
                        })}
                      />
                    </div>
                    <div className="flex gap-5 overflow-auto">
                      {pictures?.length > 0
                        ? [...pictures].map((picture, index) => (
                            <div
                              key={index}
                              className="relative w-[132px] h-[132px] overflow-hidden"
                            >
                              <img
                                src={picture}
                                onClick={() => setImageOverlay(picture)}
                                alt="product"
                                className="w-full h-full object-cover cursor-pointer"
                              />
                            </div>
                          ))
                        : [...defaultPictures].map((picture, index) => (
                            <div
                              key={index}
                              className="relative w-[132px] h-[132px] overflow-hidden"
                            >
                              <ImageWithSkeleton
                                onClick={() => setImageOverlay(picture)}
                                src={picture}
                                width={132}
                                height={132}
                                className={
                                  "cursor-pointer object-cover w-full h-full"
                                }
                                alt="product"
                              />
                            </div>
                          ))}
                    </div>
                    {pictures?.length > 0 && (
                      <DismissCircle28Filled
                        className="text-error hover:text-error-hover cursor-pointer"
                        onClick={() => {
                          setValue("picture", []);
                          setPictures([]);
                          clearErrors("picture");
                        }}
                      />
                    )}
                  </div>
                </div>
                {errors.picture && (
                  <p
                    className="text-error text-caption-lg mt-2"
                    id="error-picture-message"
                  >
                    <Info12Regular className="-mt-0.5" />{" "}
                    {errors.picture.message}
                  </p>
                )}
              </div>

              <div className="flex gap-16 mb-5">
                <div className="flex-1">
                  <TextField
                    label={"Nama Produk"}
                    id="name"
                    autoComplete="off"
                    placeholder="Tulis nama produk"
                    isError={errors.name}
                    register={{
                      ...register("name", {
                        required: {
                          value: true,
                          message: "Nama tidak boleh kosong",
                        },
                      }),
                    }}
                    message={
                      errors.name && (
                        <span>
                          <Info12Regular
                            className="-mt-0.5"
                            id="name-error-message"
                          />{" "}
                          {errors.name.message}
                        </span>
                      )
                    }
                  />
                </div>
                <div className="flex-1"></div>
              </div>
              <div className="flex w-full gap-16 mb-5">
                <div className="flex-1">
                  <label htmlFor="select-kateogri">
                    <p className="text-body-sm font-semibold mb-1">
                      Kategori Produk
                    </p>
                  </label>
                  <Controller
                    render={({ field }) => (
                      <MySelect
                        errors={errors.category}
                        field={field}
                        id="select-kategori"
                        options={options}
                        placeholder="Pilih kategori produk"
                      />
                    )}
                    name="category"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Kategori tidak boleh kosong",
                      },
                    }}
                  />

                  {errors.category && (
                    <p
                      className="text-error text-caption-lg mt-1"
                      id="category-error-message"
                    >
                      <Info12Regular className="-mt-0.5" />{" "}
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-body-sm font-semibold lg:mb-3">
                    Status Produk
                  </p>
                  <div className="flex gap-16">
                    <div className="flex gap-2 align-middle">
                      <input
                        type="radio"
                        id="radio-etalase"
                        defaultChecked={product.status === true}
                        name="status"
                        value={"etalase"}
                        className={`radio ${
                          errors?.status?.message
                            ? "radio-error"
                            : "radio-primary "
                        }`}
                        {...register("status", {
                          required: {
                            value: true,
                            message: "Pilih status produk tidak boleh kosong",
                          },
                        })}
                      />
                      <span>Etalase</span>
                    </div>
                    <div className="flex gap-2 align-middle">
                      <input
                        type="radio"
                        id="radio-arsip"
                        value={"arsip"}
                        defaultChecked={product.status === false}
                        name="status"
                        className={`radio ${
                          errors?.status?.message
                            ? "radio-error"
                            : "radio-primary "
                        }`}
                        {...register("status", {
                          required: {
                            value: true,
                            message: "Status harus diisi",
                          },
                        })}
                      />
                      <span>Arsip</span>
                    </div>
                  </div>
                  {errors.status && (
                    <p
                      className="text-error text-caption-lg mt-3"
                      id="status-error-message"
                    >
                      <Info12Regular className="-mt-0.5" />{" "}
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="">
                <p className="text-body-sm font-semibold lg:mb-1">
                  Deskripsi Produk
                </p>
                <ReactQuill
                  theme="snow"
                  id="description"
                  value={editorContent}
                  onChange={onEditorStateChange}
                  modules={MODULES}
                  placeholder="Masukkan deskripsi produk"
                  className={`h-[306px] ${
                    editorFocus && !errors.description ? "ql-focus" : null
                  } ${errors.description ? "ql-error" : null}`}
                  onFocus={() => {
                    setEditorFocus(true);
                  }}
                  onBlur={() => {
                    setEditorFocus(false);
                  }}
                />
                <div className="mt-12"></div>
                {errors.description && (
                  <p
                    className="text-error text-caption-lg"
                    id="error-image-message"
                  >
                    <Info12Regular className="-mt-0.5" /> Deskripsi tidak boleh
                    kosong
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:mt-8 border w-full border-neutral-40 rounded-md">
            <div className="p-7">
              <h6 className="text-h-6 font-bold">Informasi Seller</h6>
              <div className="grid grid-cols-2 grid-rows-3 mt-5 gap-x-16 gap-y-5">
                <TextFieldGroup
                  label={"Harga"}
                  placeholder="Masukkan harga"
                  name="price"
                  type="number"
                  id="product-price"
                  isError={errors.price}
                  register={{
                    ...register("price", {
                      required: {
                        value: true,
                        message: "Harga tidak boleh kosong",
                      },
                    }),
                  }}
                  leftIndicator={"Rp"}
                  message={
                    errors.price && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="price-error-message"
                        />{" "}
                        {errors.price.message}
                      </span>
                    )
                  }
                />
                <TextFieldGroup
                  label={"Isi"}
                  placeholder="Masukkan isi"
                  name="unit"
                  rightIndicator={"Pcs"}
                  type="number"
                  id="product-content"
                  isError={errors.unit}
                  register={{
                    ...register("unit"),
                  }}
                  topOption={"Optional"}
                  message={
                    errors.unit && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="unit-error-message"
                        />{" "}
                        {errors.unit.message}
                      </span>
                    )
                  }
                />
                <TextField
                  label={"Merek"}
                  placeholder="Masukkan merek"
                  name="brand"
                  type="text"
                  id="product-brand"
                  isError={errors.brand}
                  register={{
                    ...register("brand", {
                      required: {
                        value: true,
                        message: "Merek tidak boleh kosong",
                      },
                    }),
                  }}
                  message={
                    errors.brand && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="brand-error-message"
                        />{" "}
                        {errors.brand.message}
                      </span>
                    )
                  }
                />
                <TextFieldGroup
                  label={"Berat"}
                  placeholder="Masukkan berat"
                  rightIndicator={"Gram"}
                  name="weight"
                  type="number"
                  id="product-weight"
                  isError={errors.weight}
                  register={{
                    ...register("weight", {
                      required: {
                        value: true,
                        message: "Berat tidak boleh kosong",
                      },
                    }),
                  }}
                  message={
                    errors.weight && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="weight-error-message"
                        />{" "}
                        {errors.weight.message}
                      </span>
                    )
                  }
                />
                <TextField
                  label={"Kondisi"}
                  placeholder="Masukkan kondisi"
                  name="condition"
                  id="product-condition"
                  isError={errors.condition}
                  register={{
                    ...register("condition", {
                      required: {
                        value: true,
                        message: "Kondisi tidak boleh kosong",
                      },
                    }),
                  }}
                  message={
                    errors.condition && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="condition-error-message"
                        />{" "}
                        {errors.condition.message}
                      </span>
                    )
                  }
                />
                <TextField
                  label={"Wujud"}
                  placeholder="Masukkan wujud"
                  name="form"
                  id="product-form"
                  topOption={"Optional"}
                  register={{
                    ...register("form"),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="lg:mt-8 border w-full border-neutral-40 rounded-md">
            <div className="p-7">
              <h6 className="text-h-6 font-bold">Informasi Penjualan</h6>
              <div className="grid grid-cols-2 gap-x-16 mt-5">
                <TextField
                  label={"Nama Seller"}
                  placeholder="Masukkan nama"
                  name="sellerName"
                  id="seller-name"
                  isError={errors.sellerName}
                  register={{
                    ...register("sellerName", {
                      required: {
                        value: true,
                        message: "Nama tidak boleh kosong",
                      },
                    }),
                  }}
                  message={
                    errors.sellerName && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="sellerName-error-message"
                        />{" "}
                        {errors.sellerName.message}
                      </span>
                    )
                  }
                />
                <TextField
                  label={"Nomor Whatsapp"}
                  placeholder="Masukkan nomor"
                  name="sellerPhone"
                  type="text"
                  autoComplete="off"
                  id="seller-phone-number"
                  isError={errors.sellerPhone}
                  register={{
                    ...register("sellerPhone", {
                      required: {
                        value: true,
                        message: "Nomor tidak boleh kosong",
                      },
                      validate: (value) => {
                        //diawali dengan 62
                        const phoneRegex = /^62/;
                        if (!phoneRegex.test(value)) {
                          return "Nomor tidak valid, harus diawali dengan 62";
                        }
                        //panjang 11-13
                        if (value.length < 11 || value.length > 13) {
                          return "Nomor tidak valid, panjang nomor 11-13 karakter";
                        }
                      },
                      onChange: (e) => {
                        //value must be number
                        const value = e.target.value;
                        if (isNaN(value)) {
                          setValue("sellerPhone", "");
                        }
                        //if 0 in first index, replace with 62
                        if (value[0] === "0") {
                          setValue("sellerPhone", "62");
                        }
                      },
                    }),
                  }}
                  message={
                    errors.sellerPhone && (
                      <span>
                        <Info12Regular
                          className="-mt-0.5"
                          id="sellerPhone-error-message"
                        />{" "}
                        {errors.sellerPhone.message}
                      </span>
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex w-full mt-5 justify-end">
            <Button
              className={"rounded-full"}
              id="submit-button"
              type="submit"
              size="md"
              disabled={imageLoading || uploadLoading}
              isLoading={imageLoading || uploadLoading}
            >
              Simpan
            </Button>
          </div>
          <ConfirmModal
            cancelText={"Batal"}
            title={"Informasi Ubah Data Produk"}
            text={"Kamu yakin ingin mengubah data produk ini?"}
            confirmText={"Ubah"}
            icon={"info"}
            isOpen={isConfirmModalOpen}
            onCancel={() => {
              setIsConfirmModalOpen(false);
            }}
            onConfirm={() => {
              setIsConfirmModalOpen(false);
              saveProduct(getValues());
            }}
          />
          <NotifModal
            title={notifModal.title}
            text={notifModal.text}
            icon={notifModal.icon}
            confirmText={"Tutup"}
            isOpen={notifModal.show}
            onConfirm={() => {
              setNotifModal({
                show: false,
                isSuccess: false,
                text: "",
                title: "",
              });
              reset();
              navigate("/admin/products");
            }}
          />
        </form>
      </div>
      <div
        className={`fixed bg-black/20 w-[100vw] h-[100vh] ${
          isConfirmModalOpen || notifModal.show ? "block" : "hidden"
        } cursor-pointer top-0 bottom-0 left-0 right-0`}
      ></div>

      {imageOverlay && (
        <ImageOverlay
          image={imageOverlay}
          onClose={() => setImageOverlay(null)}
          isOpen={imageOverlay}
        />
      )}
    </SecondaryContainer>
  );
}
