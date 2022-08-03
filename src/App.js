//rfc para crear la funcion inicial
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; //Importa Browser, Routes y Route desde dom
import { Container } from '@mui/material' //importa container desde Mui
import Menutop from "./Components/Menutop"; //importa Menutop
import { PrivateRoute } from "./Components/Rutas/PrivateRoute";
import Else from './Screens/Else';
import { AppRoutes } from './Components/Rutas/AppRoutes';
import Login from './Screens/Login';

export default function App() { //Menu principal con las rutas principales

  const [isLog, setIsLog] = useState();

  function setLogValue(value) {
    setIsLog(value);
  }

  return (
    <BrowserRouter>
      <Menutop />
      {console.log(isLog)};
      <Container>
        <Routes>
          <Route path='/' element={<Login funcionSetLogValue={setLogValue} />} />
          <Route path='/*' element={<PrivateRoute isLog={isLog}> <AppRoutes /> </PrivateRoute>} />
          <Route path='*' element={<Else />} />
        </Routes>
      </Container>
      {console.log(isLog)};
    </BrowserRouter>
  )
}

