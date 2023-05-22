import { Info12Regular } from "@fluentui/react-icons";

/*
  contoh value message color: "error", "success", "warning", "info"

*/

export default function TextArea({
  label,
  message,
  topOption,
  messageColor,
  bottomOption,
  register,
  ...props
}) {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label
          className={`mb-1 flex items-end w-full ${
            !label ? "justify-end" : "justify-between"
          } `}
        >
          {label && (
            <span className="text-body-sm font-semibold">
              {label} <Info12Regular />
            </span>
          )}
          {topOption && (
            <span className={`text-[#6B7280] text-caption-lg`}>
              {topOption}
            </span>
          )}
        </label>
        <textarea
          type="text"
          placeholder="Type here"
          {...register}
          className={`textarea textarea-bordered h-24 ${
            message && messageColor
              ? "border-" + messageColor
              : "border-neutral-20"
          } focus:caret-info w-full h-[40px] rounded-[4px] focus:outline-none  ${
            message && messageColor
              ? "focus:border-" + messageColor
              : "focus:border-info"
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
                messageColor ? "text-" + messageColor : "text-[#6B7280]"
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
    </>
  );
}
