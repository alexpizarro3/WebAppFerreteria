import axios from 'axios';
import Config from './Config' //Importa el componente Config.js

const dirUsers = Config.USERS; //Usa la variable USERS del @env
const dirPostUser = Config.CREAR_USER; //Post
const dirPutUser = Config.MOD_USER; //Put
const dirDelUser = Config.BORRAR_USER; //Delete

const obtenerUsuario = async (cedula, password) => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    const res = await fetch(dirUsers + cedula + '/' + password); //Aqui se realiza la consulta al API
    return await res.json(); //retorna el resulatado en formato json
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
    await axios.put(dirPutUser+cedula, usuario)
        .then(response => {
            const resp = response.data; //retorna el resultado en formato json
            return resp; //retorna el resultado en formato json
        }).catch(error => {
            console.log(error);
            return error;
        })
}

export { obtenerUsuarios, obtenerUsuario, postUser, putUser, delUser };