export default function Step({ steps, activeStepIndex }) {
  return (
    <>
      <div
        className={`flex w-full gap-1 p-2.5 ${
          steps.length > 3 ? "justify-between" : "justify-center"
        }`}
      >
        {steps?.map((step, index) => (
          <div
            key={index}
            className={`flex items-center basis-[212px] gap-2.5 py-2.5 ps-3 ${
              index <= activeStepIndex ? "step-active" : ""
            }`}
          >
            <div className="rounded-full w-7 h-7 bg-[#D9D9D9] shrink-0 flex justify-center items-center text-black text-caption-lg">
              {index + 1}
            </div>
            <span className="text-black font-semibold">{step.title}</span>
          </div>
        ))}
      </div>
      <div className="ps-9 mt-10">{steps[activeStepIndex]?.content}</div>
    </>
  );
}
