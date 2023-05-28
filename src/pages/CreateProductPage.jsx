import {
  IosArrowLtr24Filled,
  Image24Regular,
  Info12Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import MySelect from "../components/MySelect";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MODULES } from "../constants";

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [editorFocus, setEditorFocus] = useState(false);

  const images = watch("images");

  useEffect(() => {
    register("description", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("description", editorState);
    console.log(editorState);
    trigger("description");
  };

  let editorContent = watch("description");

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    { value: "alat-tani", label: "Alat Tani" },
    { value: "bibit", label: "Bibit" },
    { value: "pestisida", label: "Pestisida" },
    { value: "pupuk", label: "Pupuk" },
  ];

  return (
    <div className="w-full lg:mt-[75px] mb-10">
      <div className="flex gap-3 items-center font-bold lg:mx-8">
        <Link
          to={"/admin/products"}
          id="go-to-products"
          className="hover:text-info"
        >
          <IosArrowLtr24Filled />
        </Link>
        <h4 className="text-h-4">Tambah Produk</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:mx-8 lg:mt-8 border border-neutral-40 rounded-md">
          <div className="p-7">
            <h6 className="text-h-6 font-bold">Informasi Produk</h6>
            <div className="flex flex-col my-5">
              <p className="font-semibold text-body-s mb-2.5">Foto Produk</p>
              <div className="">
                <div className="flex gap-5">
                  <div className="">
                    <label
                      htmlFor="image-input"
                      className={`cursor-pointer w-[132px] h-[132px] border ${
                        errors?.images
                          ? "border-error text-error"
                          : "border-neutral-40 text-neutral-40 "
                      } flex flex-col justify-center items-center text-center p-5 text-body-sm`}
                    >
                      <Image24Regular />
                      Tambahkan Foto ({images?.length ? images.length : "0"}
                      /5)
                    </label>
                    <input
                      type="file"
                      id="image-input"
                      className="hidden"
                      multiple
                      accept="image/*"
                      {...register("images", {
                        required: {
                          value: true,
                          message: "Gambar tidak boleh kosong",
                        },
                        validate: (value) => {
                          const files = Array.from(value);
                          if (files.length > 5) {
                            setValue("images", null);
                            return "Gambar produk tidak boleh lebih dari 5";
                          }
                        },
                      })}
                    />
                  </div>
                  {images?.length > 0 &&
                    [...images].map((image, index) => (
                      <div
                        key={index}
                        className="relative w-[132px] h-[132px] overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt="product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
              {errors.images && (
                <p
                  className="text-error text-caption-lg mt-2"
                  id="error-image-message"
                >
                  <Info12Regular className="-mt-0.5" /> {errors.images.message}
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
                      errors={errors}
                      field={field}
                      id="select-kategori"
                      options={options}
                      placeholder="Pilih kategori produk"
                    />
                  )}
                  name="category"
                  control={control}
                  defaultValue=""
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
                          message: "Status harus dipilih",
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
        <div className="lg:mx-8 lg:mt-8 border border-neutral-40 rounded-md">
          <div className="p-7">
            <h6 className="text-h-6 font-bold">Informasi Seller</h6>
            <div className="grid grid-cols-2 grid-rows-3 mt-5 gap-x-16 gap-y-5">
              <TextField
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
                    min: {
                      value: 1,
                      message: "Harga tidak boleh kurang dari 1",
                    },
                  }),
                }}
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
              <TextField
                label={"Isi"}
                placeholder="Masukkan isi"
                name="content"
                type="number"
                id="product-content"
                register={{
                  ...register("content"),
                }}
                topOption={"Optional"}
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
              <TextField
                label={"Berat"}
                placeholder="Masukkan berat"
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
                name="display"
                id="product-display"
                topOption={"Optional"}
                register={{
                  ...register("display"),
                }}
              />
            </div>
          </div>
        </div>
        <div className="lg:mx-8 lg:mt-8 border border-neutral-40 rounded-md">
          <div className="p-7">
            <h6 className="text-h-6 font-bold">Informasi Penjualan</h6>
            <div className="flex gap-16 mt-5">
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
                      message: "Nama seller tidak boleh kosong",
                    },
                    minLength: {
                      value: 4,
                      message: "Minimal 4 karakter",
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
                name="phoneNumber"
                id="seller-phone-number"
                isError={errors.phoneNumber}
                register={{
                  ...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Nomor tidak boleh kosong",
                    },
                  }),
                }}
                message={
                  errors.phoneNumber && (
                    <span>
                      <Info12Regular
                        className="-mt-0.5"
                        id="phoneNumber-error-message"
                      />{" "}
                      {errors.phoneNumber.message}
                    </span>
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex w-full mt-5 justify-end pe-8">
          <Button
            className={"rounded-full"}
            id="submit-button"
            type="submit"
            size="md"
          >
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
