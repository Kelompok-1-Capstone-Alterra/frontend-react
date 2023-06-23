import { motion } from "framer-motion";

export default function Checkmark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <motion.path
        d="M14.1 27.2L22.9 36 36 14.9"
        fill="none"
        stroke="#4BB543"
        strokeWidth="4"
        strokeDasharray="48"
        strokeDashoffset="48"
        initial={{ strokeDashoffset: 48 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}
