import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Modal, TextField, Button } from '@mui/material';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DataTable from '../Components/DataTable';
import styled from '@emotion/styled';
import { delProducto, obtenerProductos, postProducto, putProducto } from '../Components/Api'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Productos = () => {

  const styles = useStyles(); //Aqui se almacenan los estilos
  const [dataGrid, setDataGrid] = useState([]);
  const [cellData, setCellData] = useState();

  const [data, setData] = useState([]);
  const [modNuevo, setModNuevo] = useState(false);
  const [modProd, setModProd] = useState(false);
  const [modElim, setModElim] = useState(false);
  const [newProd, setNewProd] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    precioventa: "",
    preciocompra: "",
  });

  const handleClick = (event, cellValue, modo) => {
    setCellData(cellValue.row);
    setNewProd(cellValue.row);
    seleccionarProducto(cellValue.row, modo);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewProd(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const abrirCerrarModalInsertar = () => {
    setModNuevo(!modNuevo);
  };

  const columns = [
    { field: 'IdProducto', headerName: 'Id', width: 10 },
    { field: 'Nombre', headerName: 'Producto', width: 200 },
    { field: 'Descripcion', headerName: 'Descripcion', width: 225 },
    { field: 'Tipo', headerName: 'Tipo', width: 10 },
    { field: 'PrecioVenta', headerName: 'Precio Venta', width: 100 },
    { field: 'PrecioCompra', headerName: 'Precio Compra', width: 120 },
    { field: 'Inventario', headerName: 'Inventario', width: 40 },
    {
      field: 'editar', headerName: 'Editar', width: 60, renderCell: (cellValue) => {
        return (
          <DriveFileRenameOutlineOutlinedIcon onClick={(event) => { handleClick(event, cellValue, "editar") }} >
          </DriveFileRenameOutlineOutlinedIcon>
        );
      }
    },
    {
      field: 'borrar', headerName: 'Borrar', width: 60, renderCell: (cellValue) => {
        return (
          <DeleteOutlinedIcon onClick={(event) => { handleClick(event, cellValue, "borrar") }} sx={{ color: 'red', bgcolor: 'white', borderRadius: '4px' }} >
          </DeleteOutlinedIcon>

        );
      }
    },
  ];

  const fetchData = async () => {
    const loaddata = await obtenerProductos();
    setDataGrid(loaddata);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const seleccionarProducto = (productoSel, modo) => {
    setCellData(productoSel);
    (modo === 'editar') ? console.log("Hola") //abrirCerrarModalModificar()
      :
      console.log("Hola");//abrirCerrarModalEliminar();
  };

  const peticionPost = async () => {
    const res = await postProducto(newProd);
    console.log(res);
    setData(data.concat(res));
    abrirCerrarModalInsertar();
  };

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Producto</h3>
      <TextField label="Nombre" name="nombre" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Descripción" name="descripcion" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField type="number" label="Tipo" name="tipo" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Pr. Venta" name="precioventa" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br />
      <TextField label="Pr. Compra" name="preciocompra" onChange={handleChange} sx={{ bgcolor: '#e9c46a', height: '3rem', marginTop: '1rem' }} inputProps={{ style: { color: "black", height: '1rem' } }} InputLabelProps={{ style: { color: "white" } }} />
      <br /><br />
      <div align="center">
        <Button variant='contained' onClick={() => peticionPost()} color="primary" sx={{ marginRight: '1rem' }}>Insertar</Button>
        <Button variant='contained' onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )


  return (
    <Container >
      <Typography sx={{ color: 'black', fontSize: '40px', textAlign: 'center', verticalAlignment: 'center', marginLeft: '21rem' }}>
        Productos
        <Tooltip title='Nuevo Producto' placement='left' aria-details='Nuevo'>
          <AddToPhotosOutlinedIcon color="primary" onClick={() => abrirCerrarModalInsertar()} role="button" tabIndex={0} sx={{ color: '#blue', fontSize: 50, marginLeft: '7rem' }} ></AddToPhotosOutlinedIcon>
        </Tooltip>
        <Link to='/dashboard'>
          <Tooltip title='Dashboard' placement='top' aria-details='Indicadores'>
            <AssessmentOutlinedIcon sx={{ color: '#ffe100', fontSize: 50, marginLeft: '2rem' }}></AssessmentOutlinedIcon>
          </Tooltip>
        </Link>
        <Link to='/usuarios'>
          <Tooltip title='Usuarios' placement='right' aria-details='Mantenimiento'>
            <PeopleAltIcon sx={{ color: '#9a031e', fontSize: 50, marginLeft: '2rem' }}></PeopleAltIcon>
          </Tooltip>
        </Link>
      </Typography>
      <Box>
        <DataTable
          getRowId={row => row.IdProducto}
          rows={dataGrid}
          columns={columns}
        />

        <Modal sx={{ textAlign: "center", marginLeft: "24rem", marginTop: "7rem", marginBottom: "3rem", bgcolor: "rgba(38, 7, 1, 0.75)", width: "30rem", color: "white" }}
          open={modNuevo}
          onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

      </Box>
    </Container>
  )
}

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


export default Productos

