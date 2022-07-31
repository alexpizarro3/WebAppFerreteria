import Config from './Config' //Importa el componente Config.js

const dirUsers = Config.USERS; //Usa la variable USERS del @env

const obtenerUsuario = async (cedula, password) => { //Funcion flecha que devuelve todos los usuarios del backend PERN
    const res = await fetch(dirUsers + cedula + '/' + password); //Aqui se realiza la consulta al API
    return await res.json(); //retorna el resulatado en formato json.
};

export { obtenerUsuario };