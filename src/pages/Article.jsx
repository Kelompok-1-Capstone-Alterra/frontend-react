import Button from "../components/Button";
import { Add20Regular,Info12Regular } from "@fluentui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";


export default function Article() {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState(productList);


  useEffect(() => {
    axios
      .get("https://647348bad784bccb4a3c6bcf.mockapi.io/products")
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <MainContainer/>
      {/* title */}
      <div className="ml-[25px] flex">
        <h1 className="font-bold text-h-4 font-bold">Artikel</h1>
      </div>

      {/* search */}
      <div className="ml-[45px] mt-[31px] mb-[29px] w-[1121px]">
        <div className="relative mb-4 flex w-full items-stretch">
          <TextField label="" variant="search" type="search" onChange={(event) => setFilteredList(event.target.value)}></TextField>
        </div>
      </div>

      {/* Table */}
      <div className="pl-[45px] pr-[29px] w-full h-[620px] ">
        <div className="border w-full flex">
          <div className="overflow-x-auto">
            <div className="w-full flex">
              <h1 className="w-[90rem] text-body-lg mt-[34px] ml-[24px] mb-[33px] ">
                Artikel Aktif
              </h1>
              <Link to="/admin/articles/create" className="flex">
                  
              <Button className="mt-[20px] mr-[44px] mb-[19px] pl-[18px]">
                <Add20Regular className="mr-[10.5px]" />
                Tambah
              </Button>
                </Link>
            </div>
            {/* head */}
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                          <th scope="col" className="px-6 py-4 pr-[40px] flex">
                            <input
                              type="checkbox"
                              className="checkbox mr-[12px]"
                            />
                            <div className="flex items-center space-x-3">
                              <div>
                                <div className="capitalize text-base text-xs text-[#667085]">
                                  Nama Artikel
                                </div>
                              </div>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs text-[#667085]"
                          >
                            Ukuran File
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs text-[#667085]"
                          >
                            Tanggal Upload
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs text-[#667085]"
                          >
                            Dilihat
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-xs text-[#667085]"
                          >
                            Disukai
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.filter(
                (value) =>
                  value.name.toLowerCase().includes(filteredList)
              ).map((product, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium flex">
                              <input
                                type="checkbox"
                                className="checkbox mr-[12px] mt-3"
                              />
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
                            <td className="whitespace-nowrap px-6 py-4">{product.description}</td>
                            <td className="whitespace-nowrap px-6 py-4">Otto</td>
                            <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                            <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* <thead >
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
              </thead> */}
            {/* <tbody>
                {productList.map((product) => (
                  <tr>
                    <td className="flex">
                      <input
                        type="checkbox"
                        className="checkbox mr-[12px] mt-3"
                      />
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
              </tbody> */}
          </div>
        </div>
      </div>
    </>
  );
}
