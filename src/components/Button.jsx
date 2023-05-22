export default function Button({
  children,
  className,
  variant = "green",
  size = "lg",
  ...props
}) {
  const variants = {
    green:
      "btn-primary text-neutral-10 hover:bg-primary-hover active:bg-primary-pressed disabled:bg-neutral-20 disabled:text-neutral-40 disabled:hover:bg-neutral-20 disabled:hover:text-neutral-40",
    "outline-green":
      "border border-primary text-primary bg-transparent hover:bg-transparent hover:text-primary-hover hover:border-primary-hover active:border-primary-pressed active:text-primary-pressed disabled:text-neutral-40 disabled:border-neutral-20 disabled:hover:border-neutral-20 disabled:hover:text-neutral-40",
    gray: "bg-neutral-20 hover:bg-neutral-30 text-neutral-40 border-none",
    lightgreen:
      "bg-primary-border text-primary hover:bg-primary hover:text-neutral-10 focus:bg-primary-surface disabled:bg-neutral-20 disabled:text-neutral-40 disabled:hover:bg-neutral-20 disabled:hover:text-neutral-40",
    text: "text-primary border-none bg-transparent hover:text-primary-hover hover:bg-transparent active:text-primary-pressed disabled:text-neutral-40 disabled:hover:text-neutral-40",
  };

  const sizes = {
    lg: "px-11 h-14 text-body-lg",
    md: "px-10 h-11 text-body-sm",
    sm: "px-9 h-9 text-caption-lg",
  };

  return (
    <button
      className={`${className} btn normal-case min-h-max disabled:pointer-events-auto disabled:cursor-not-allowed rounded-[41px] ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
