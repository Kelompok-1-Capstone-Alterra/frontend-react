import Button from "../components/Button";
import { Add20Regular } from "@fluentui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Article() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios
          .get("https://64301554b289b1dec4c0e920.mockapi.io/products")
          .then((response) => {
            setProductList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

  return (
    <>
      {/* title */}
      <div className="ml-[25px] mt-[78px] flex">
        <h1 className="font-bold text-h-4 font-bold">Artikel</h1>
      </div>

      {/* search */}
      <div className="ml-[45px] mt-[31px] w-[1121px]">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding pl-10 pr-[0.25rem] py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
          />

          {/* Search icon */}
          <Button
            variant={"green"}
            size="lg"
            className={"rounded-full ml-[13px]"}
          >
            Cari
          </Button>
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="pl-[45px] pr-[29px] w-full h-[620px] ">
        <div className="border w-full flex">
          <div className="overflow-x-auto w-full">
            <div className="w-full flex">
              <h1 className="w-[90rem] text-body-lg mt-[34px] ml-[24px] mb-[33px] ">
                Artikel Aktif
              </h1>
              <Button className="mt-[20px] mr-[24px] mb-[19px]"><Add20Regular className="mr-5"/>Tambah</Button>
            </div>
            <table className="table table-zebra w-full">
              {/* head */}
              <thead >
                <tr>
                  <th className="flex">
                    <input type="checkbox" className="checkbox mr-[12px]" />
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="capitalize text-base text-xs text-[#667085]" >Name</div>
                      </div>
                    </div>
                  </th>
                  <th className="capitalize text-xs text-[#667085]">Ukuran File</th>
                  <th className="capitalize text-base text-xs text-[#667085]">Tanggal Upload</th>
                  <th className="capitalize text-base text-xs text-[#667085]">Dilihat</th>
                  <th className="capitalize text-base text-xs text-[#667085]">Diskusi</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {productList.map((product) => (
                    
                <tr>
                  <td className="flex">
                    <input type="checkbox" className="checkbox mr-[12px] mt-3" />
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 rounded-full">
                          <img
                            src={product.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                  </td>
                  <td>Purple</td>
                  <td>Purple</td>
                  <td>Purple</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
