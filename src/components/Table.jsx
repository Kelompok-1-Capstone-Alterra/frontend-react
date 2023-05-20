import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Table(props) {
  const [productList, setProductList] = useState([]);

  const fetchData = () => {
    axios
      .get("https://64301554b289b1dec4c0e920.mockapi.io/products")
      .then((res) => {
        setProductList(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  
    var HTML_TABLE_1 = productList.map((item, index) => {
      return (
        <tr  className={productList.length -1 == index  ? 'border-t border-b border-primary bg-primary-border':""  }>
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.category}</td>
          <td className="px-6 py-4">{item.freshness}</td>
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.name}</td>
        </tr>
      );
    });
    var HTML_TABLE_2 = productList.map((item, index) => {
      return (
        <tr>
          <td className="px-6 py-4">index : {index}</td>
          <td className="px-6 py-4">cuaca</td>
          <td className="px-6 py-4">{item.freshness}</td>
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4">{item.name}</td>
        </tr>
      );
    });
  

  const { className, border } = props;

  if (border == "product") {
    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead
                  className={`font-medium border-primary bg-primary-border border-b ${className}`}
                >
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Header
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Header
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Header
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Header
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Header
                    </th>
                  </tr>
                </thead>
                <tbody>{HTML_TABLE_1}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead
                className={`font-medium dark:border-neutral-500 bg-primary-border ${className}`}
              >
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Header
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Header
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Header
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Header
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Header
                  </th>
                </tr>
              </thead>
              <tbody>{HTML_TABLE_2}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
