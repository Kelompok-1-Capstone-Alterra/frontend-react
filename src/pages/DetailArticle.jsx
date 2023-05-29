import Button from "../components/Button";
import { Add20Regular } from "@fluentui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "../components/TextField";
import { Link } from "react-router-dom";
import MainContainer from "../components/layouts/MainContainer";
import { useLocation } from "react-router-dom";

export default function DetailArticle() {
  const [product, setProduct] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    axios
      .get(`https://647348bad784bccb4a3c6bcf.mockapi.io/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <h1>Detail Artikel</h1>
      <p>Nama: {product.name}</p>
      <p>Deskripsi: {product.description}</p>
    </>
  );
}
