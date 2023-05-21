export default function Tab({ items }) {
  return (
    <ul className="tabs gap-3 w-full justify-center">
      {items.map((item, index) => (
        <li
          key={index}
          className={
            "tab tab-bordered border-b-0 h-auto py-5 grow text-neutral-70/100 tab-active"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
