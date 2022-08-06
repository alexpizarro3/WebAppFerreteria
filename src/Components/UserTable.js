import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';
import { obtenerUsuarios } from '../Components/Api';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const UserTable = () => {

    const [data, setData] = useState([]);
    const [cellValue, setCellValue] = useState();
    const handleClick = (event, cellValues) => {
        setCellValue(cellValues);
    };

    const columns = [
        { field: 'idUser', headerName: 'Id Usuario', width: 130 },
        { field: 'userCedula', headerName: '# Cedula', width: 130 },
        { field: 'userNombre', headerName: 'Nombre Usuario', width: 130 },
        { field: 'userRole', headerName: 'Role', width: 130 },
        { field: 'password', headerName: 'Contraseña', width: 130 },
        {
            field: 'editar', headerName: 'Editar', width: 60, renderCell: (cellValues) => {
                return (
                    <DriveFileRenameOutlineOutlinedIcon onClick={(event) => { handleClick(event, cellValues) }} >
                    </DriveFileRenameOutlineOutlinedIcon>
                );
            }
        },
        {
            field: 'borrar', headerName: 'Borrar', width: 60, renderCell: (cellValues) => {
                return (
                    <DeleteOutlinedIcon onClick={(event) => { handleClick(event, cellValues) }} sx={{ color: 'red', bgcolor: 'white', borderRadius: '4px' }} >
                    </DeleteOutlinedIcon>

                );
            }
        },
    ];

    const fetchData = async () => {
        const loaddata = await obtenerUsuarios();
        setData(loaddata);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <DataTable
                getRowId={row => row.idUser}
                rows={data}
                columns={columns}
                cellValues={cellValue}
            />
        </>
    );
};

export default UserTable
