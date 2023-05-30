import { useState } from "react";

export default function TextFieldGroup({
  label,
  message,
  topOption,
  bottomOption,
  isError,
  register,
  leftIndicator,
  rightIndicator,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="form-control">
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
      <label className="flex w-full isolate items-stretch">
        {/* left indicator */}
        {leftIndicator && (
          <span
            className={`flex items-center px-2 border-t border-b border-l ${
              isError
                ? "border-error"
                : isFocused
                ? "border-info"
                : "border-neutral-30"
            }  rounded-s-md text-neutral-40`}
          >
            {leftIndicator}
          </span>
        )}
        <input
          {...props}
          {...register}
          className={`input h-[40px] w-full rounded-none ${
            isError
              ? "border-error"
              : isFocused
              ? "border-info"
              : "border-neutral-30"
          } input-bordered focus:outline-none ${
            leftIndicator ? "rounded-l-none" : "rounded-l-md"
          } ${rightIndicator ? "rounded-r-none" : "rounded-r-md"}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* right indicator */}
        {rightIndicator && (
          <span
            className={`flex items-center px-2 border-t border-b border-r ${
              isError
                ? "border-error"
                : isFocused
                ? "border-info"
                : "border-neutral-30"
            }  rounded-e-md text-neutral-40`}
          >
            {rightIndicator}
          </span>
        )}
      </label>
      <label
        className={`mt-1 flex ${
          !message ? "justify-end" : "justify-between"
        } w-full"`}
      >
        {message && (
          <span
            className={`label-text-alt ${
              isError ? "text-error" : "text-neutral-30"
            } text-caption-lg`}
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
    </div>
  );
}
