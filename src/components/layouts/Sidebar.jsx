import {
  ChevronRight20Filled,
  Grid20Regular,
  TreeDeciduous20Regular,
  WeatherCloudy20Regular,
  Box20Regular,
  News20Regular,
} from "@fluentui/react-icons";

import logoAdmin from "./../../assets/Logo Admin.png";

export default function Sidebar({ children }) {
  const active = "bg-primary-surface text-primary border-e-4 border-e-primary";

  return (
    <div className="drawer drawer-mobile">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <!-- Page content here --> */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary text-neutral-10 absolute -left-1 top-20 rounded-e-[41px] justify-end drawer-button lg:hidden"
        >
          <ChevronRight20Filled />
        </label>
        {children}
      </div>
      <div className="drawer-side w-[280px] shadow-elevation-1">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay"
        ></label>
        <ul className="menu pt-14 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <img
            src={logoAdmin}
            alt="Logo Admin"
            className="self-center"
          />
          <ul className="mt-14 text-neutral-70 text-body-sm">
            <li>
              <a className={`px-8 py-4 hover:bg-primary-surface ${active}`}>
                <Grid20Regular /> Overview
              </a>
            </li>
            <li>
              <a className="px-8 py-4 hover:bg-primary-surface">
                <TreeDeciduous20Regular /> Tanaman
              </a>
            </li>
            <li>
              <a className="px-8 py-4 hover:bg-primary-surface">
                <WeatherCloudy20Regular />
                Manajemen Cuaca
              </a>
            </li>
            <li>
              <a className="px-8 py-4 hover:bg-primary-surface">
                <Box20Regular /> Produk
              </a>
            </li>
            <li>
              <a className="px-8 py-4 hover:bg-primary-surface">
                <News20Regular />
                Manajemen Artikel
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
