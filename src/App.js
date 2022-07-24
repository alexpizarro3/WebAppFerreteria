import { BrowserRouter, Routes, Route } from "react-router-dom"; //Importa Browser, Routes y Route desde dom
import {Compras, Dashboard, Login, Productos, Usuarios, Ventas} from "./Screens/Login"; //Importa todas las Screens

export default function App() { //rfc para crear la funcion inicial
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Usuarios" element={<Usuarios />}/>
        <Route path="/Productos" element= {<Productos />}/>
        <Route path="/Compras" element={<Compras />}/>
        <Route path="/Ventas" element={<Ventas />}/>
        <Route path="/Dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

