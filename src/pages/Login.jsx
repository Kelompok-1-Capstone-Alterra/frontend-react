import { useState } from "react";
import Table from "../components/Table";
import TextArea from "../components/TextArea";
import TextField from "../components/TextField";


export default function Login() {


  return (
    <>
      <h1>Ini halaman login</h1>
      <p>ini ivan </p>
      <p>ini footernya</p>

      
      <Table border="product"></Table>
      <TextField label="nama" className="ml-10"></TextField>
      <TextArea label= "Umur" variant="red" className="ml-10"></TextArea>
    </>
  );
}
