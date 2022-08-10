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
}

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
}

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
    console.log(producto);
    await axios.post(dirPostProducto, producto)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            console.log(resp);
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
}


export { obtenerUsuarios, obtenerUsuario, postUser, putUser, delUser, obtenerProducto, obtenerProductos, postProducto, delProducto, putProducto };