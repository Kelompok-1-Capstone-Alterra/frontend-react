export default function TextField({ label, type,className, variant, register , ...props}) {
  const variants = {
    neutral: "text-neutral-40 bg-neutral-30 border-neutral-30",
    blue: "border-info",
    red : "border-error",
    green : "border-success",
    gray : "bg-neutral-30 border-primary-surface"

  };

    return (
      <>
      {label && (

        <label className={`text-body-sm font-bold ${className}`}>{label}</label>
      )}
        <div className="mt-2">
          <input
            type={type}
            className={`min-w-0 flex-auto rounded border border-solid px-1 py-[0.25rem] outline-none ${variants[variant]}`}
            placeholder="Type Value"
            {...props}
          />
          
        </div>
      </>
    );
  }
  
