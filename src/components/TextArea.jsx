import { useState } from "react";

export default function TextArea(props) {
  const variants = {
    neutral: "text-neutral-40 bg-neutral-30 border-neutral-30",
    blue: "border-info",
    red: "border-error",
    gray: "bg-neutral-30 border-primary-surface",
  };
  const { label, className, variant } = props;
  const [error, setError] = useState(false);

  const handleError = (event) => {
    if (event.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  };
  if (label) {
    return (
      <>
        <label
          className={`text-body-sm font-bold justify-between ${className}`}
        >
          {label}
        </label>
        <div className="relative mb-3">
          <textarea
            className={`border rounded px-3 py-[0.32rem] leading-[1.6] outline-none ${className} ${variants[variant]}`}
            placeholder="Your message"
            required
            onBlur={handleError}
          />
          {error && (
            <div className="text-error text-body-xs mt-1 ml-10">
              Field cannot be empty.
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <textarea
        className="border-b rounded px-3 py-[0.32rem] leading-[1.6] outline-none"
        placeholder="Your message"
        required
        onBlur={handleError}
      />
      {error && (
        <div className="text-error text-body-xs mt-1">
          Field cannot be empty.
        </div>
      )}
    </>
  );
}
