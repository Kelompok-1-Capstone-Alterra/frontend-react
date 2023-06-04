import { useState } from "react";

export default function useMultistepForm(steps = []) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  function handleNextStep() {
    if (activeStepIndex < steps?.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  }

  function handlePreviousStep() {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  }

  function goToStep(index) {
    setActiveStepIndex(index);
  }

  return {
    activeStep: steps[activeStepIndex].content,
    steps: steps,
    isFirstStep: activeStepIndex === 0,
    isLastStep: activeStepIndex === steps?.length - 1,
    activeStepIndex,
    handleNextStep,
    handlePreviousStep,
    goToStep,
    setActiveStepIndex: activeStepIndex,
  };
}
