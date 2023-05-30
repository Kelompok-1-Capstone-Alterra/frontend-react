import { Image24Regular, Info12Regular } from "@fluentui/react-icons";
import SecondaryContainer from "../components/layouts/SecondaryContainer";
import { NotifModal, ConfirmModal } from "../components/Modal";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "../components/TextField";
import MySelect from "../components/MySelect";
import TextFieldGroup from "../components/TextFieldGroup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Button from "../components/Button";
import ReactQuill from "react-quill";
import { MODULES } from "../constants";
import "react-quill/dist/quill.snow.css";

export default function UpdateProductPage() {
  const product = useLoaderData();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [editorFocus, setEditorFocus] = useState(false);
  const [editorContent, setEditorContent] = useState(product?.description);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [notifModal, setNotifModal] = useState({
    show: false,
    icon: "",
    text: "",
    title: "",
  });

  const navigate = useNavigate();

  const images = watch("picture");

  useEffect(() => {
    register("description", {
      required: true,
      validate: (value) => value !== "<p><br></p>",
    });
  }, [register]);

  useEffect(() => {
    if (product) {
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const onEditorStateChange = (editorState) => {
    setValue("description", editorState);
    trigger("description");
    setEditorContent(editorState);
  };

  // let editorContent = watch("description");

  const saveProduct = async (data) => {
    const response = await axios.put(
      `https://6428ef045a40b82da4c9fa2d.mockapi.io/api/products/${product.id}`,
      {
        ...data,
        category: data.category.value,
        status: data.status === "etalase" ? true : false,
      }
    );

    if (response.status === 200) {
      setNotifModal({
        show: true,
        icon: "success",
        title: "Edit Produk",
        text: "Produk kamu berhasil diedit!",
      });
    } else {
      setNotifModal({
        show: true,
        icon: "info",
        title: "Edit Produk",
        text: "Produk gagal diedit!",
      });
    }
  };

  const onSubmit = () => {
    setIsConfirmModalOpen(true);
  };

  const options = [
    { value: "Alat Tani", label: "Alat Tani" },
    { value: "Bibit", label: "Bibit" },
    { value: "Pestisida", label: "Pestisida" },
    { value: "Pupuk", label: "Pupuk" },
  ];

  const defaultOption = options.find(
    (option) => option.value === product?.category
  );

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
                  <div className="flex gap-5">
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
                        Tambahkan Foto ({images?.length ? images.length : "0"}
                        /5)
                      </label>
                      <input
                        type="file"
                        id="picture-input"
                        className="hidden"
                        multiple
                        accept="image/*"
                        {...register("picture", {
                          required: {
                            value: true,
                            message: "Gambar tidak boleh kosong",
                          },
                          validate: (value) => {
                            const files = Array.from(value);
                            if (files.length > 5) {
                              setValue("picture", null);
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
                    defaultValue={product.name}
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
                    defaultValue={defaultOption}
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
                  defaultValue={product.price}
                  id="product-price"
                  isError={errors.price}
                  register={{
                    ...register("price", {
                      required: {
                        value: true,
                        message: "Harga tidak boleh kosong",
                      },
                      min: {
                        value: 1000,
                        message: "Harga tidak boleh kurang dari Rp.1000",
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
                  defaultValue={product.unit}
                  rightIndicator={"Pcs"}
                  type="number"
                  id="product-content"
                  isError={errors.unit}
                  register={{
                    ...register("unit", {
                      min: {
                        value: 1,
                        message: "Isi tidak boleh kurang dari 1",
                      },
                    }),
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
                  defaultValue={product.brand}
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
                  defaultValue={product.weight}
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
                      min: {
                        value: 1,
                        message: "Berat tidak boleh kurang dari 1",
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
                  defaultValue={product.condition}
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
                  defaultValue={product.form}
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
              <div className="flex gap-16 mt-5">
                <TextField
                  label={"Nama Seller"}
                  placeholder="Masukkan nama"
                  defaultValue={product.sellerName}
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
                  name="sellerPhone"
                  defaultValue={product.sellerPhone}
                  id="seller-phone-number"
                  isError={errors.sellerPhone}
                  register={{
                    ...register("sellerPhone", {
                      required: {
                        value: true,
                        message: "Nomor tidak boleh kosong",
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
            >
              Simpan
            </Button>
          </div>
          <ConfirmModal
            cancelText={"Kembali"}
            title={"Edit Produk"}
            text={"Apakah Anda yakin ingin mengedit produk ini?"}
            confirmText={"Edit"}
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
            confirmText={"Kembali"}
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
    </SecondaryContainer>
  );
}
