import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { motion, AnimatePresence } from "framer-motion";

const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div>
      {!imageLoaded && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-[${width}px] h-[${height}px] ${className}`}
          >
            <Skeleton
              width={width}
              height={height}
              borderRadius={0}
            />
          </motion.div>
        </AnimatePresence>
      )}{" "}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ display: imageLoaded ? "block" : "none" }}
        className={`${className} w-[${width}px] h-[${height}px]`}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
