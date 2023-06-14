import { useRef } from "react";

export default function ImageOverlay({ image, isOpen, onClose }) {
  const overlayRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40"
          ref={overlayRef}
          onClick={handleOverlayClick}
        >
          <div className="relative">
            <img
              src={image}
              alt="Full Size"
              className="w-full max-w-[50vw] max-h-[50vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
