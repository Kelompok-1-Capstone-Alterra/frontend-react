import React, { useState } from "react";
import Button from "./Button";
import {
  Edit24Regular,
  LockClosed24Regular,
  Checkmark24Regular,
} from "@fluentui/react-icons";

const Card = ({
  image,
  archived,
  productName,
  productPrice,
  views,
  onHandle,
  icon = <Edit24Regular className="text-black" />,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div className="card w-[227px] h-[410px] bg-neutral-10 rounded-[5px] border-solid border-[1px] border-neutral-40 relative">
        <div className="w-[225px] h-[225px] bg-[#D9D9D9] rounded-t-[5px] flex flex-col items-center justify-center">
          {image && !archived && (
            <figure className="flex items-center justify-center h-full">
              <img
                src={image}
                alt="gambar"
                className="w-full h-full object-cover rounded-t-[5px]"
              />
            </figure>
          )}
          {archived && (
            <>
              <LockClosed24Regular className="w-7 h-7 text-neutral-10" />
              <p className="text-body-sm text-neutral-10 font-bold">
                Diarsipkan
              </p>
            </>
          )}
        </div>
        <div
          className="absolute top-[15px] left-[15px] p-[2px] w-[18px] bg-neutral-10 h-[18px] rounded-sm border-2 border-neutral-60 flex items-center justify-center"
          onClick={handleCheck}>
          {checked && <Checkmark24Regular />}
        </div>
        <div className="product w-[225px] h-[184px] rounded-b-[5px] pt-4 px-[11px] space-y-2.5 pb-[11px]">
          <p className="text-body-lg font-bold">{productName}</p>
          <p className="font-semibold text-error text-body-lg">
            Rp. {productPrice}
          </p>
          <p className="font-normal text-body-sm text-neutral-50">
            {views} dilihat
          </p>
          <hr className="border neutral-50" />
          <Button variant="gray" className="h-8 w-[205px]" onClick={onHandle}>
            {React.cloneElement(icon, {
              className: "text-black",
            })}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Card;
