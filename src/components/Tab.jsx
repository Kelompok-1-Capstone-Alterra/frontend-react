export default function Tab({
  size = "md",
  tabs = [],
  activeTabIndex = 0,
  widthFull = true,
  vertical = false,
}) {
  const sizes = {
    sm: "h-14",
    md: "h-16",
  };

  return (
    <div>
      <ul
        className={`tabs gap-3 w-full justify-start ${
          vertical ? "flex-col" : ""
        }`}
      >
        {tabs?.map((tab, index) => (
          <li
            key={tab.id}
            className={`tab tab-bordered border-b-0 px-3 text-neutral-70/100 ${
              widthFull ? "grow" : ""
            } ${sizes[size]} ${activeTabIndex === index ? "tab-active" : ""}`}
          >
            <span>{tab.title}</span>
          </li>
        ))}
      </ul>
      <div>{tabs[activeTabIndex]?.content}</div>
    </div>
  );
}
