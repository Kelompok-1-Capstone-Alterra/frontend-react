import { ChevronLeftRegular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

export default function SecondaryContainer({
  children,
  title = "",
  backTo = "",
  className,
  ...props
}) {
  return (
    <div
      className={`${className} p-3 py-[54px] w-full pe-16`}
      {...props}
    >
      <div className="flex items-center gap-2.5 py-2.5 mb-8">
        <Link
          id="backChevronIcon"
          to={backTo}
        >
          <ChevronLeftRegular className="text-[32px]" />
        </Link>
        <h4 className="text-h-4 font-bold">{title}</h4>
      </div>
      {children}
    </div>
  );
}
