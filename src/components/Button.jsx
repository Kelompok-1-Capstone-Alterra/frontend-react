export default function Button({ children, className, variant, ...props }) {
  const variants = {
    green: "btn-primary hover:bg-[#047857] text-white",
    "outline-green":
      "border border-primary hover:border-[#047857] hover:text-[#047857] hover:bg-white text-primary",
    gray: "bg-[#D1D5DB] text-[#6B7280] hover:bg[#9CA3AF]",
    lightgreen: "bg-[#D1FAE5] hover:bg-[#10B981]",
  };

  return (
    <button
      className={`btn normal-case ${className} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
