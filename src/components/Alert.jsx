import { motion } from "framer-motion";
import { Info24Filled } from "@fluentui/react-icons";

export default function Alert({ variant, message, className }) {
  const variants = {
    info: "bg-info-surface text-info border-info-border",
    primary: "bg-primary-surface text-primary border-primary-border",
    warning: "bg-warning-surface text-warning border-warning-border",
    error: "bg-error-surface text-error border-error-border",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: +50 }}
      transition={{ duration: 0.17 }}
      className={`alert font-semibold border ${variants[variant]} shadow-lg ${className}`}
    >
      <div>
        <Info24Filled className="alert-icon" />
        <span>{message}</span>
      </div>
    </motion.div>
  );
}
