export default function Step({ steps }) {
  return (
    <div
      className={`flex w-full gap-1 py-2.5 ${
        steps.length > 3 ? "justify-between" : "justify-center"
      }`}
    >
      {steps?.map((step, index) => (
        <div
          key={index}
          className="flex items-center basis-[212px] gap-2.5 py-2.5 ps-3"
        >
          <div className="rounded-full w-7 h-7 bg-[#D9D9D9] flex justify-center items-center text-black text-caption-lg">
            1
          </div>
          <span className="text-black font-semibold">Number</span>
        </div>
      ))}
    </div>
  );
}
