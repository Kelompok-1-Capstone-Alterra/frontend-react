export default function TextArea({ label, className, variant, register , ...props}) {
  const variants = {
    neutral: "text-neutral-40  border-neutral-30 hover:border-neutral-60 active:border-neutral-90",
    blue: "border-info hover:border-info-hover active:border-info-pressed",
    red: "border-error hover:border-error-hover active:border-error-pressed",
    gray: "bg-neutral-30 border-primary-surface  hover:border-primary-hover",
    green : "border-success hover:border-success-hover active:border-success-pressed"
  };
  
    return (
      <>
      {label && (
        
        <label
          className={`text-body-sm font-semibold justify-between`}
        >
          {label}
        </label>
      )}
        <div className="relative mb-3">
          <textarea
            className={`border rounded px-2 py-[0.32rem] leading-[1.6] outline-none ${variants[variant]}  ${className} `}
            placeholder="Your message"           
            {...register}
            {...props}
          />

        </div>
      </>
    );
  }


