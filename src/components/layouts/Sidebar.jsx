import {
  ChevronRight20Filled,
  Grid20Regular,
  TreeDeciduous20Regular,
  WeatherCloudy20Regular,
  Box20Regular,
  News20Regular,
} from "@fluentui/react-icons";

import logoAdmin from "./../../assets/Logo Admin.png";
import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar({ children }) {
  const { pathname } = useLocation();
  const itemListRef = useRef(null);

  useEffect(() => {
    itemListRef.current.childNodes.forEach((item) => {
      if (
        pathname.includes(item.childNodes[0].pathname) &&
        item.childNodes[0].pathname !== "/admin" &&
        item.childNodes[0].pathname !== "/admin/"
      ) {
        item.childNodes[0].classList.add("active");
      } else if (
        item.childNodes[0].pathname === "/admin" &&
        pathname === "/admin"
      ) {
        item.childNodes[0].classList.add("active");
      } else {
        item.childNodes[0].classList.remove("active");
      }
    });
  }, [pathname]);

  return (
    <div className="drawer drawer-mobile">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div
        style={{
          zIndex: 20,
        }}
        className="drawer-content flex flex-col items-start justify-start"
      >
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
          <ul
            className="mt-14 text-neutral-70 text-body-sm"
            ref={itemListRef}
          >
            <li>
              <Link
                className="px-8 py-4 hover:bg-primary-surface"
                to={"/admin"}
              >
                <Grid20Regular /> Overview
              </Link>
            </li>
            <li>
              <Link
                className="px-8 py-4 hover:bg-primary-surface"
                to={"/admin/plants"}
              >
                <TreeDeciduous20Regular /> Tanaman
              </Link>
            </li>
            <li>
              <Link
                className="px-8 py-4 hover:bg-primary-surface"
                to={"/admin/weathers"}
              >
                <WeatherCloudy20Regular />
                Manajemen Cuaca
              </Link>
            </li>
            <li>
              <Link
                className="px-8 py-4 hover:bg-primary-surface"
                to={"/admin/products"}
              >
                <Box20Regular /> Produk
              </Link>
            </li>
            <li>
              <Link
                className="px-8 py-4 hover:bg-primary-surface"
                to={"/admin/articles"}
              >
                <News20Regular />
                Manajemen Artikel
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}
