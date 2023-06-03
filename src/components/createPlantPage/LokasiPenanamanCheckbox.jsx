import { Info12Regular } from "@fluentui/react-icons";
import { useController } from "react-hook-form";

export default function LokasiPenanamanCheckbox({
  checkedCheckboxes,
  setCheckedCheckboxes,
  control,
  name,
  rules,
  errorMessage,
  ...props
}) {
  const { field } = useController({
    control,
    name,
    rules,
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
            let checkedCheckboxesCopy = [...checkedCheckboxes];

            // checkedCheckboxesCopy[0] = e.target.checked ? e.target.value : null;
            if (e.target.checked) {
              checkedCheckboxesCopy = [
                ...checkedCheckboxesCopy,
                e.target.value,
              ];
            } else {
              checkedCheckboxesCopy = checkedCheckboxes.filter(
                (value) => value !== e.target.value
              );
            }

            field.onChange(checkedCheckboxesCopy);

            setCheckedCheckboxes(checkedCheckboxesCopy);
          }}
          ref={field.ref}
          type="checkbox"
          checked={checkedCheckboxes.includes("container")}
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
            let checkedCheckboxesCopy = [...checkedCheckboxes];

            // checkedCheckboxesCopy[1] = e.target.checked ? e.target.value : null;
            if (e.target.checked) {
              checkedCheckboxesCopy = [
                ...checkedCheckboxesCopy,
                e.target.value,
              ];
            } else {
              checkedCheckboxesCopy = checkedCheckboxes.filter(
                (value) => value !== e.target.value
              );
            }

            field.onChange(checkedCheckboxesCopy);

            setCheckedCheckboxes(checkedCheckboxesCopy);
          }}
          type="checkbox"
          checked={checkedCheckboxes.includes("in-ground")}
          className="checkbox checkbox-primary checkbox-xs rounded-sm border-neutral-70"
          value="in-ground"
          {...props}
        />
        <span className="label-text">tanpa pot</span>
      </label>
      {errorMessage && (
        <p className={`label-text-alt text-error text-caption-lg pt-3`}>
          <Info12Regular className="-mt-0.5" /> {errorMessage}
        </p>
      )}
      <div className={checkedCheckboxes.length === 0 ? "h-[500px]" : ""}></div>
    </div>
  );
}
