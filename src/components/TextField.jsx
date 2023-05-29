import { Search24Regular } from "@fluentui/react-icons";
import { useState } from "react";

export default function TextField({
  label,
  message,
  topOption,
  variant = "default",
  bottomOption,
  register,
  className,
  isError = false,
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <div className="form-control w-full">
        {variant === "search" ? (
          <>
            {label && (
              <label className="label -mb-1 -ml-1">
                <span className=" text-body-sm font-semibold">{label}</span>
              </label>
            )}
            <label
              className={`${className} overflow-hidden flex justify-center items-stretch gap-0 rounded-[4px] border ${
                isFocus ? "border-info" : "border-neutral-30"
              }`}
            >
              <span className={`bg-white px-2 mt-1.5`}>
                <Search24Regular />
              </span>
              <input
                {...register}
                className={`${
                  isError ? "border-error" : "border-neutral-30"
                } focus:caret-info w-full h-[40px] rounded-[4px] focus:outline-none  ${
                  isError ? "focus:border-error" : "focus:border-info"
                }`}
                {...props}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </label>
          </>
        ) : (
          <>
            <label
              className={`mb-1 flex items-end w-full ${
                !label ? "justify-end" : "justify-between"
              } `}
            >
              {label && (
                <span className="text-body-sm font-semibold">{label}</span>
              )}
              {topOption && (
                <span className={`text-[#6B7280] text-caption-lg`}>
                  {topOption}
                </span>
              )}
            </label>
            <input
              {...register}
              className={`${className} input input-bordered
              ${
                isError ? "border-error" : "border-neutral-30"
              } focus:caret-info w-full h-[40px] rounded-[4px] focus:outline-none  ${
                isError ? "focus:border-error" : "focus:border-info"
              }`}
              {...props}
            />
            <label
              className={`mt-1 flex ${
                !message ? "justify-end" : "justify-between"
              } w-full"`}
            >
              {message && (
                <span
                  className={`label-text-alt ${
                    isError ? "text-error" : "text-[#6B7280]"
                  } text-caption-lg`}
                >
                  {message}
                </span>
              )}
              {bottomOption && (
                <span
                  className={`label-text-alt text-[#6B7280] text-caption-lg`}
                >
                  {bottomOption}
                </span>
              )}
            </label>
          </>
        )}
      </div>
          
    </>
  );
}
