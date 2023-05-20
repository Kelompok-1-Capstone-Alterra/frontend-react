import React from "react";
import {
  CheckmarkCircle24Regular,
  Info24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";
import Button from "./Button";

const Modal = ({
  isOpen,
  text,
  title,
  cancelText,
  confirmText,
  icon,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  const iconComponents = {
    success: CheckmarkCircle24Regular,
    info: Info24Regular,
    delete: Delete24Regular,
  };

  const SelectedIcon = icon && iconComponents[icon];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="border bg-neutral-10 w-[487px] rounded-[10px] p-[32px] shadow-elevation-2 border-1 top-1/2 left-1/2 h-auto">
            <div className="flex flex-col items-center justify-center">
              {SelectedIcon && <SelectedIcon className="mb-3 w-10 h-10" />}
              <h5 className="font-bold text-h-5 text-neutral-80 mb-2">
                {title}
              </h5>
              <p className="font-normal text-center text-body-lg text-[#637381] mb-6">
                {text}
              </p>
              <div className="modal-action space-x-4">
                <Button
                  variant="outline-green"
                  className="rounded-full w-[190px] h-[44px]"
                  onClick={handleCancel}>
                  {cancelText ? cancelText : "Label"}
                </Button>
                <Button
                  variant="green"
                  className="rounded-full w-[190px] h-[44px]"
                  onClick={handleConfirm}>
                  {confirmText ? confirmText : "Label"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;