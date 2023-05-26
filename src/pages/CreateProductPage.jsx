import {
  IosArrowLtr24Filled,
  Image24Regular,
  Info12Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";
import TextField from "../components/TextField";

import { useForm } from "react-hook-form";
import Button from "../components/Button";

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const images = watch("images");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <div className="flex gap-3 items-center font-bold lg:mt-[75px] lg:ms-11">
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
                          message: "Gambar produk tidak boleh kosong",
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
                <p className="text-error text-caption-lg mt-2">
                  <Info12Regular className="-mt-0.5" /> {errors.images.message}
                </p>
              )}
            </div>
            <div className="flex w-ful gap-16">
              <div className="flex-1">
                <TextField
                  label={"Nama Produk"}
                  autoComplete="off"
                  placeholder="Tulis nama produk"
                  register={{
                    ...register("name", {
                      required: {
                        value: true,
                        message: "Nama produk harus diisi",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "Nama produk tidak boleh lebih dari 50 karakter",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Nama produk tidak boleh kurang dari 3 karakter",
                      },
                    }),
                  }}
                  message={
                    errors.name && (
                      <span>
                        <Info12Regular className="-mt-0.5" />{" "}
                        {errors.name.message}
                      </span>
                    )
                  }
                  messageColor={errors.name && "error"}
                />
              </div>
              <div className="flex-1">
                <p className="text-body-sm font-semibold lg:mb-3">
                  Status Produk
                </p>
                <div className="flex gap-10">
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
                          message: "Status produk harus diisi",
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
                          message: "Status produk harus diisi",
                        },
                      })}
                    />
                    <span>Arsip</span>
                  </div>
                </div>
                {errors.status && (
                  <p className="text-error text-caption-lg mt-3">
                    <Info12Regular className="-mt-0.5" />{" "}
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          className={"rounded-full"}
          type="submit"
          size="md"
        >
          Simpan
        </Button>
      </form>
    </div>
  );
}
