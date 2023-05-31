import { useState } from "react";
import { Controller } from "react-hook-form";

export default function FileInput({
  id,
  className,
  topOption,
  label,
  message,
  bottomOption,
  isError = false,
  name,
  control,
  rules,
  value,
  ...props
}) {
  const [fileName, setFileName] = useState("");


  return (
    <div className={`${className} max-w-[480px]`}>
      <label
        className={`mb-1 flex items-end w-full ${
          !label ? "justify-end" : "justify-between"
        } `}
      >
        {label && <span className="text-body-sm font-semibold">{label}</span>}
        {topOption && (
          <span className={`text-[#6B7280] text-caption-lg`}>{topOption}</span>
        )}
      </label>
      <div className={`flex items-stretch text-body-sm`}>
        <label
          htmlFor={id}
          className="w-max bg-primary text-neutral-10 rounded  py-2 px-8 z-10 cursor-pointer hover:bg-primary-hover active:bg-primary-pressed shrink-0"
        >
          Pilih File
        </label>
        <span
          className={`pointer-events-none py-2 text-[#6B7280] ps-4 border border-[#6B7280] -ms-1.5 rounded w-full basis-[356px] truncate ${
            isError ? "border-[#EF4444]" : ""
          }`}
        >
          {fileName && fileName}
          {value && !fileName && value.name}
          {!fileName && !value && "Masukkan Gambar"}
        </span>
      </div>
      <label
        className={`mt-1 flex ${
          !message ? "justify-end" : "justify-between"
        } w-full"`}
      >
        {message && (
          <span
            className={`label-text-alt ${
              isError ? "text-error" : "text-[#6B7280]"
            } text-caption-sm`}
          >
            {message}
          </span>
        )}
        {bottomOption && (
          <span className={`label-text-alt text-[#6B7280] text-caption-lg`}>
            {bottomOption}
          </span>
        )}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange, ...field } }) => (
          <input
            id={id}
            {...field}
            type="file"
            className=" hidden"
            accept=".jpg,.jpeg,.png"
            value={value?.fileName}
            onChange={(e) => {
              onChange(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }}
            {...props}
          />
        )}
      />
    </div>
  );
}
