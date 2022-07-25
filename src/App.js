import { BrowserRouter, Routes, Route } from "react-router-dom"; //Importa Browser, Routes y Route desde dom
import Compras from "./Screens/Compras"; //Importa todas las Screens
import Dashboard from "./Screens/Dashboard"; //Importa todas las Screens
import Login from "./Screens/Login"; //Importa todas las Screens
import Productos from "./Screens/Productos"; //Importa todas las Screens
import Usuarios from "./Screens/Usuarios"; //Importa todas las Screens
import Ventas from "./Screens/Ventas"; //Importa todas las Screens
import {Container} from '@mui/material' //importa container desde Mui
import Menutop from "./Components/Menutop"; //importa Menutop

export default function App() { //rfc para crear la funcion inicial
  return (
    <BrowserRouter>
      <Menutop />
      <Container>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/Usuarios" element={<Usuarios />}/>
          <Route path="/Productos" element= {<Productos />}/>
          <Route path="/Compras" element={<Compras />}/>
          <Route path="/Ventas" element={<Ventas />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

