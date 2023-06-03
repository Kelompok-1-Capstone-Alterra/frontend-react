import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import LokasiPenanamanCheckbox from "./LokasiPenanamanCheckbox";
import PlantingWithPotForm from "./PlantingWithPotForm";
import PlantingWithoutPotForm from "./PlantingWithoutPot";
import { addPlantDataState } from "../../utils/recoil_atoms";

export default function PenanamanForm({ formId, onSubmit }) {
  const addPlantData = useRecoilValue(addPlantDataState);

  const methods = useForm({ defaultValues: addPlantData });
  const {
    handleSubmit,
    unregister,
    control,
    formState: { defaultValues, errors },
  } = methods;

  const [checkedCheckboxes, setCheckedCheckboxes] = useState(
    defaultValues.planting?.method || []
  );

  useEffect(() => {
    if (!checkedCheckboxes?.includes("container")) {
      unregister(["withPotPlantMethod", "withPotPlantTools", "withPotImage"]);
    } else if (!checkedCheckboxes?.includes("in-ground")) {
      unregister([
        "withoutPotPlantMethod",
        "withoutPotPlantTools",
        "withoutPotImage",
      ]);
    }
  }, [checkedCheckboxes]);

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-10">
          <LokasiPenanamanCheckbox
            checkedCheckboxes={checkedCheckboxes}
            setCheckedCheckboxes={setCheckedCheckboxes}
            name="planting.method"
            control={control}
            rules={{ required: "Pilih lokasi tanaman tidak boleh kosong" }}
            errorMessage={errors.planting?.method?.message}
          />
          {checkedCheckboxes?.includes("container") && (
            <>
              <hr className="mt-4" />
              <PlantingWithPotForm />
            </>
          )}
          {checkedCheckboxes?.includes("in-ground") && (
            <>
              <hr className="mt-4" />
              <PlantingWithoutPotForm />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
