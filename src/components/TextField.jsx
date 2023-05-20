import { useState } from "react";

export default function TextField(props) {
  const variants = {
    neutral: "text-neutral-40 bg-neutral-30 border-neutral-30",
    blue: "border-info",
    red : "border-error",
    green : "border-success",
    gray : "bg-neutral-30 border-primary-surface"

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
        <label className={`text-body-sm font-bold ${className}`}>{label}</label>
        <div className="mt-2">
          <input
            type="text"
            className={`min-w-0 flex-auto rounded border border-solid px-3 py-[0.25rem] outline-none ${className} ${variants[variant]}`}
            placeholder="Type Value"
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
    
    <input
      type="text"
      className="min-w-0 flex-auto rounded border border-solid px-3 py-[0.25rem] outline-none"
      placeholder="Type Value"
      onBlur={handleError}
    />
    {error && (
      <div className="text-error text-body-xs mt-1 ml-10">
        Field cannot be empty.
      </div>
    )}
    </>
  );
}
