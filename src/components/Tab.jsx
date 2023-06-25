export default function Tab({
  size = "md",
  tabs = [],
  activeTabIndex = 0,
  widthFull = true,
  vertical = false,
  setActiveTabIndex,
}) {
  const sizes = {
    sm: "h-14",
    md: "h-16",
  };

  return (
    <>
      <ul
        className={`tabs gap-3 w-full justify-start border-b-2 ${
          vertical ? "flex-col" : ""
        } ${sizes[size]}`}
      >
        {tabs?.map((tab, index) => (
          <li
            id="tab.id"
            key={tab.id}
            className={`tab hover:text-primary transition-all duration-200  tab-bordered border-b-0 px-3 -mb-0.5 h-full text-neutral-70/100 ${
              widthFull ? "grow" : ""
            } ${activeTabIndex === index ? "tab-active" : ""}`}
            onClick={() => setActiveTabIndex(index)}
          >
            <span>{tab.title}</span>
          </li>
        ))}
      </ul>
      <div>{tabs[activeTabIndex]?.content}</div>
    </>
  );
}
