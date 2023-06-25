import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

import LokasiPenanamanCheckbox from "./LokasiPenanamanCheckbox";
import PlantingWithPotForm from "./PlantingWithPotForm";
import PlantingWithoutPotForm from "./PlantingWithoutPot";
import { addPlantDataState } from "../../utils/recoil_atoms";
import { iterateConvertFileToBase64 } from "../../utils/functions";
import useScrollToTop from "../../hooks/useScrollToTop";

const PenanamanForm = forwardRef(function PenanamanForm(
  { formId, onSubmit },
  ref
) {
  const addPlantData = useRecoilValue(addPlantDataState);

  const methods = useForm({ defaultValues: addPlantData });
  const {
    handleSubmit,
    unregister,
    getValues,
    formState: { defaultValues, errors },
  } = methods;

  const [checkedCheckboxes, setCheckedCheckboxes] = useState({
    container: defaultValues.planting_info?.planting_container ?? false,
    ground: defaultValues.planting_info?.planting_ground ?? false,
  });

  useEffect(() => {
    if (!checkedCheckboxes.container) {
      unregister([
        "planting_info.container_info.container_instruction",
        "planting_info.container_info.container_materials",
        "planting_info.container_info.container_pictures",
      ]);
    } else if (!checkedCheckboxes.ground) {
      unregister([
        "planting_info.ground_info.ground_instruction",
        "planting_info.ground_info.ground_materials",
        "planting_info.ground_info.ground_pictures",
      ]);
    }
  }, [checkedCheckboxes]);

  useScrollToTop();

  useImperativeHandle(ref, () => {
    return {
      getFormValues: async () => {
        const formValues = getValues();

        const newFormValues = await iterateConvertFileToBase64(formValues);

        return newFormValues;
      },
    };
  });

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
            errorMessage={
              errors.planting_info?.planting_container?.message ??
              errors.planting_info?.planting_ground?.message
            }
          />
          {checkedCheckboxes?.container && (
            <>
              <hr className="mt-4" />
              <PlantingWithPotForm />
            </>
          )}
          {checkedCheckboxes?.ground && (
            <>
              <hr className="mt-4" />
              <PlantingWithoutPotForm />
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
});

export default PenanamanForm;
