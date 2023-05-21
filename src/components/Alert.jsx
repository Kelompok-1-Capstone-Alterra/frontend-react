import { Info24Filled } from "@fluentui/react-icons";

export default function Alert({ variant, message, className }) {
  const variants = {
    info: "bg-info-surface text-info border-info-border",
    primary: "bg-primary-surface text-primary border-primary-border",
    warning: "bg-warning-surface text-warning border-warning-border",
    error: "bg-error-surface text-error border-error-border",
  };

  return (
    <div
      className={`alert font-semibold border ${variants[variant]} shadow-lg ${className}`}
    >
      <div>
        <Info24Filled className="alert-icon" />
        <span>{message}</span>
      </div>
    </div>
  );
}
