export default function Tab({
  size = "md",
  items,
  activeTab,
  widthFull = true,
  vertical = false,
}) {
  const sizes = {
    sm: "h-14",
    md: "h-16",
  };

  return (
    <ul
      className={`tabs gap-3 w-full justify-start ${
        vertical ? "flex-col" : ""
      }`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`tab tab-bordered border-b-0 px-3 text-neutral-70/100 ${
            widthFull ? "grow" : ""
          } ${sizes[size]} ${activeTab === index ? "tab-active" : ""}`}
        >
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
