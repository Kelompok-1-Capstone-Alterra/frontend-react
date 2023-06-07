import { Info12Regular } from "@fluentui/react-icons";
import { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function LokasiPenanamanCheckbox({
  checkedCheckboxes,
  setCheckedCheckboxes,
  errorMessage,
  ...props
}) {
  const { getValues, control } = useFormContext();

  const atLeastOneChecked = useCallback(() => {
    const errorMessage = "Pilih lokasi tanaman tidak boleh kosong";
    const values = getValues([
      "planting_info.planting_container",
      "planting_info.planting_ground",
    ]);

    const isValid = values.some((v) => v);
    return isValid || errorMessage;
  }, []);

  const { field: containerField } = useController({
    control,
    name: "planting_info.planting_container",
    rules: { validate: atLeastOneChecked },
  });

  const { field: groundField } = useController({
    control,
    name: "planting_info.planting_ground",
    rules: { deps: ["planting_info.planting_container"] },
  });

  return (
    <div>
      <h6 className="text-body-sm font-semibold">Pilih Lokasi Tanaman</h6>
      <p className="text-caption-lg mb-3">
        Isi terlebih dahulu lokasi dari tanaman yang kamu tambahkan
      </p>
      <label className="cursor-pointer inline-flex items-center gap-3.5 me-4">
        <input
          id="plantingWithPotCheckbox"
          autoFocus
          onChange={(e) => {
            containerField.onChange(e.target.checked);

            setCheckedCheckboxes((prevState) => ({
              ...prevState,
              [e.target.value]: e.target.checked,
            }));
          }}
          ref={containerField.ref}
          type="checkbox"
          checked={checkedCheckboxes.container}
          className="checkbox checkbox-primary checkbox-xs rounded-sm checked:text-neutral-10 border-neutral-70"
          value="container"
          {...props}
        />
        <span className="label-text">dengan pot / polybag</span>
      </label>
      <label className="cursor-pointer inline-flex items-center gap-3.5">
        <input
          id="plantingWithoutPotCheckbox"
          onChange={(e) => {
            groundField.onChange(e.target.checked);

            setCheckedCheckboxes((prevState) => ({
              ...prevState,
              [e.target.value]: e.target.checked,
            }));
          }}
          ref={containerField.ref}
          type="checkbox"
          checked={checkedCheckboxes.ground}
          className="checkbox checkbox-primary checkbox-xs rounded-sm border-neutral-70"
          value="ground"
          {...props}
        />
        <span className="label-text">tanpa pot</span>
      </label>
      {errorMessage && (
        <p className={`label-text-alt text-error text-caption-lg pt-3`}>
          <Info12Regular className="-mt-0.5" /> {errorMessage}
        </p>
      )}
      <div
        className={
          checkedCheckboxes.container === false &&
          checkedCheckboxes.ground === false
            ? "h-[500px]"
            : ""
        }
      ></div>
    </div>
  );
}
