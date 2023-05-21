export default function TextField({ label, type,className, variant, register , ...props}) {
  const variants = {
    neutral: "text-neutral-40  border-neutral-30 hover:border-neutral-60 active:border-neutral-90",
    blue: "border-info hover:border-info-hover active:border-info-pressed",
    red: "border-error hover:border-error-hover active:border-error-pressed",
    gray: "bg-neutral-30 border-primary-surface  hover:border-primary-hover active:border-primary-pressed",
    green : "border-success hover:border-success-hover active:border-success-pressed"
  };

    return (
      <>
      {label && (

        <label className={`text-body-sm font-semibold `}>{label}</label>
      )}
        <div className="mt-1">
          <input
            type={type}
            className={`min-w-0 flex-auto rounded border border-solid px-2 py-[0.25rem] outline-none ${variants[variant]} ${className}`}
            placeholder="Type Value"
            {...register}
            {...props}
          />
          
        </div>
      </>
    );
  }
  
