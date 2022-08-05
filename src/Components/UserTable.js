import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';
import { obtenerUsuarios } from '../Components/Api';

const columns = [
    { field: 'idUser', headerName: 'Id Usuario', width: 150 },
    { field: 'userCedula', headerName: '# Cedula', width: 150 },
    { field: 'userNombre', headerName: 'Nombre Usuario', width: 150 },
    { field: 'userRole', headerName: 'Role', width: 150 },
    { field: 'password', headerName: 'Contraseña', width: 150 },
];

const UserTable = () => {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const loaddata = await obtenerUsuarios();
        setData(loaddata);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataTable 
            getRowId={row => row.idUser}
            rows={data}
            columns={columns}
        />
    );
};

export default UserTable
