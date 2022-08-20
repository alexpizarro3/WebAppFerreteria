import userContextUsuario from './UserContext';
import React, { useContext } from 'react';
import axios from 'axios';
import Config from './Config' //Importa el componente Config.js

const dirUsers = Config.USERS; //Usa la variable USERS del @env
const dirPostUser = Config.CREAR_USER; //Post
const dirPutUser = Config.MOD_USER; //Put
const dirDelUser = Config.BORRAR_USER; //Delete
const dirProductos = Config.PRODUCTOS;
const dirPostProducto = Config.CREAR_PRODUCTO; //Post
const dirPutProducto = Config.MOD_PRODUCTO; //Put
const dirDelProducto = Config.BORRAR_PRODUCTO; //Delete
const dirPostVenta = Config.CREAR_VENTA; //Post
const dirPostDetalleVenta = Config.CREAR_DETALLE_VENTA; //Post
const dirPostCompra = Config.CREAR_COMPRA; //Post
const dirPutCantInv = Config.MOD_CAN_INV; //Put
const dirPostDetalleCompra = Config.CREAR_DETALLE_COMPRA; //Post

const obtenerUsuario = async (cedula, password) => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    const res = await fetch(dirUsers + cedula + '/'); //Aqui se realiza la consulta al API
    const response = await res.json();
    if (response.password.trimEnd() === password) {
        response.message = "done";
        return response;
    } else {
        return response;
    };

    //retorna el resulatado en formato json
};

const obtenerUsuarios = async () => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    const data = await fetch(dirUsers); //Aqui se realiza la consulta al API
    return await data.json(); //retorna el resulatado en formato json
};

const postUser = async (usuario) => {
    await axios.post(dirPostUser, usuario)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const delUser = async (cedula) => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    console.log(cedula);
    const res = await axios.delete(dirDelUser + cedula); //Aqui se realiza la consulta al API
    return await res.data; //retorna el resulatado en formato json
};

const putUser = async (cedula, usuario) => {
    console.log(cedula);
    console.log(usuario);
    await axios.put(dirPutUser + cedula, usuario)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const obtenerProducto = async (IdProducto) => { //Funcion flecha que devuelve el producto del backend PERN
    const res = await fetch(dirProductos + IdProducto + '/'); //Aqui se realiza la consulta al API
    const response = await res.json();
    return response;
};

const obtenerProductos = async () => { //Funcion flecha que devuelve todos los productos del backend PERN
    const data = await fetch(dirProductos); //Aqui se realiza la consulta al API
    return await data.json(); //retorna el resulatado en formato json
};

const postProducto = async (producto) => {
    await axios.post(dirPostProducto, producto)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const delProducto = async (IdProducto) => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    console.log(IdProducto);
    const res = await axios.delete(dirDelProducto + IdProducto); //Aqui se realiza la consulta al API
    return await res.data; //retorna el resulatado en formato json
};

const putProducto = async (idProducto, producto) => {
    await axios.put(dirPutProducto + idProducto, producto)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            return error;
        })
};

const postVenta = async (venta) => {
    await axios.post(dirPostVenta, venta)
        .then((response) => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const postDetalleVenta = async (detalleVenta) => {
    console.log(detalleVenta);
    await axios.post(dirPostDetalleVenta, detalleVenta)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            console.log(resp);
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const postCompra = async (compra) => {
    await axios.post(dirPostCompra, compra)
        .then((response) => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const postDetalleCompra = async (detalleCompra) => {
    console.log(detalleCompra);
    await axios.post(dirPostDetalleCompra, detalleCompra)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            console.log(resp);
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

const putCanInv = async (IdProducto, Cantidad) => {
    console.log(dirPutCantInv, IdProducto, Cantidad);
    await axios.put(dirPutCantInv + IdProducto, Cantidad)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            console.log(resp);
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
};

export { obtenerUsuarios, obtenerUsuario, postUser, putUser, delUser, obtenerProducto, obtenerProductos, postProducto, delProducto, putProducto, postVenta, postDetalleVenta, postCompra, postDetalleCompra, putCanInv };