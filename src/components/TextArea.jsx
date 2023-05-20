export default function TextArea({ label, className, variant, register , ...props}) {
  const variants = {
    neutral: "text-neutral-40 bg-neutral-30 border-neutral-30",
    blue: "border-info",
    red: "border-error",
    gray: "bg-neutral-30 border-primary-surface",
  };


    return (
      <>
      {label && (
        
        <label
          className={`text-body-sm font-bold justify-between ${className}`}
        >
          {label}
        </label>
      )}
        <div className="relative mb-3">
          <textarea
            className={`border rounded px-1 py-[0.32rem] leading-[1.6] outline-none${variants[variant]}`}
            placeholder="Your message"
            {...props}
          />

        </div>
      </>
    );
  }


