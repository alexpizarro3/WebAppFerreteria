import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Modal, TextField, Button } from '@mui/material';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DataTable from '../Components/DataTable';
import styled from '@emotion/styled';
import { obtenerUsuarios, postUser } from '../Components/Api'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';


const Usuarios = () => {
  const styles = useStyles(); //Aqui se almacenan los estilos
  const [dataGrid, setDataGrid] = useState([]);
  const [cellData, setCellData] = useState();

  const [data, setData] = useState([]);
  const [modNuevo, setModNuevo] = useState(false);
  const [modUser, setModUser] = useState(false);
  const [modElim, setModElim] = useState(false);
  const [newUser, setNewUser] = useState({
    cedula: "",
    nombre: "",
    apellidos: "",
    role: "",
    password: "",
  });

  const handleClick = (event, cellValue, modo) => {
    setCellData(cellValue.row);
    setNewUser(cellValue.row);
    seleccionarUsuario(cellValue, modo);
  };

  const columns = [
    { field: 'idUser', headerName: 'Id Usuario', width: 130 },
    { field: 'userCedula', headerName: '# Cedula', width: 130 },
    { field: 'userNombre', headerName: 'Nombre Usuario', width: 130 },
    { field: 'userRole', headerName: 'Role', width: 130 },
    { field: 'password', headerName: 'Contraseña', width: 130 },
    {
      field: 'editar', headerName: 'Editar', width: 60, renderCell: (cellValue) => {
        return (
          <DriveFileRenameOutlineOutlinedIcon onClick={(event) => { handleClick(event, cellValue, "editar") }} >
          </DriveFileRenameOutlineOutlinedIcon>
        );
      }
    },
    {
      field: 'borrar', headerName: 'Borrar', width: 60, renderCell: (cellValues) => {
        return (
          <DeleteOutlinedIcon onClick={(event) => { handleClick(event, cellValues, "borrar") }} sx={{ color: 'red', bgcolor: 'white', borderRadius: '4px' }} >
          </DeleteOutlinedIcon>

        );
      }
    },
  ];

  const fetchData = async () => {
    const loaddata = await obtenerUsuarios();
    setDataGrid(loaddata);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const abrirCerrarModalInsertar = () => {
    setModNuevo(!modNuevo);
  };

  const abrirCerrarModalModificar = () => {
    setModUser(!modUser);
  };

  const abrirCerrarModalEliminar = () => {
    setModElim(!modElim);
  }


  const seleccionarUsuario = (user, modo) => {
    console.log(user);
    (modo === 'editar') && abrirCerrarModalModificar();
  }

  const peticionPost = async () => {
    const res = await postUser(newUser);
    setData(data.concat(res));
    abrirCerrarModalInsertar();
  };


  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField label="Cédula" name="cedula" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Nombre" name="nombre" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Apellidos" name="apellidos" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Role" name="role" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Contraseña" name="password" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br /><br />
      <div align="center">
        <Button onClick={() => peticionPost()} variant='contained' color="primary" sx={{ marginRight: '1rem' }}>Insertar</Button>
        <Button variant='contained' onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField label="Cedula" name="cedula" sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} onChange={handleChange} value={newUser && newUser.userCedula} />
      <br />
      <TextField label="Nombre" name="nombre" sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} onChange={handleChange} value={newUser && newUser.userNombre} />
      <br />
      <TextField label="Apellidos" name="apellidos" sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} onChange={handleChange} value={newUser && newUser.userApellidos} />
      <br />
      <TextField label="Role" name="role" sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} onChange={handleChange} value={newUser && newUser.userRole} />
      <br />
      <TextField label="Password" name="password" sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} onChange={handleChange} value={newUser && newUser.password} />
      <br /><br />
      <div align="center">
        <Button color="primary">Editar</Button>
        <Button onClick={() => abrirCerrarModalModificar()}>Cancelar</Button>
      </div>
    </div>
  )

  return (
    <Container >
      <Typography sx={{ color: 'black', fontSize: '40px', textAlign: 'center', verticalAlignment: 'center', marginLeft: '22rem' }}>
        Usuarios
        <Tooltip title='Nuevo Usuario' placement='left' aria-details='Nuevo'>
          <AddToPhotosOutlinedIcon color="primary" onClick={() => abrirCerrarModalInsertar()} role="button" tabIndex={0} sx={{ color: '#blue', fontSize: 50, marginLeft: '8rem' }} ></AddToPhotosOutlinedIcon>
        </Tooltip>
        <Link to='/dashboard'>
          <Tooltip title='Dashboard' placement='top' aria-details='Indicadores'>
            <AssessmentOutlinedIcon sx={{ color: '#ffe100', fontSize: 50, marginLeft: '2rem' }}></AssessmentOutlinedIcon>
          </Tooltip>
        </Link>
        <Link to='/productos'>
          <Tooltip title='Productos' placement='right' aria-details='Mantenimiento'>
            <ConstructionOutlinedIcon sx={{ color: '#9a031e', fontSize: 50, marginLeft: '2rem' }}></ConstructionOutlinedIcon>
          </Tooltip>
        </Link>
      </Typography>
      <Box >
        <DataTable
          getRowId={row => row.idUser}
          rows={dataGrid}
          columns={columns}
        />
        <Modal sx={{ textAlign: "center", marginLeft: "24rem", marginTop: "8rem", marginBottom: "3rem", bgcolor: "rgba(38, 7, 1, 0.75)", width: "30rem", color: "white" }}
          open={modNuevo}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

        <Modal
          open={modUser}
          onClose={abrirCerrarModalModificar}>
          {bodyEditar}
        </Modal>

      </Box>

    </Container>
  )
};

const useStyles = styled((theme) => ({
  modal: {
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '8px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '50%'
  }
}));

export default Usuarios; 
