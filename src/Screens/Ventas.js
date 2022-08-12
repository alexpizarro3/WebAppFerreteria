import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CustomFooterTotalComponent } from '../Components/customFooter';
import { Button, Typography } from '@mui/material';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'preciou',
    headerName: 'Precio Unitario',
    type: 'number',
    width: 110,
  },
  {
    field: 'cantidad',
    headerName: 'Cantidad',
    type: 'number',
    width: 110,
  },
  {
    field: 'subtotal',
    headerName: 'Subtotal',
    type: 'number',
    width: 110,
  },
  {
    field: 'iva',
    headerName: 'IVA',
    description: 'Multiplicar Subtotal * 13%',
    type: 'number',
    width: 110,
    valueGetter: (params) =>
      `${params.row.subtotal}` * 0.13,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, preciou: 500, cantidad: 1, subtotal: 500 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, preciou: 700, cantidad: 3, subtotal: 2100 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, preciou: 800, cantidad: 4, subtotal: 1600 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, preciou: 600, cantidad: 5, subtotal: 3000 },
];

const Ventas = () => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [impuesto, setImpuesto] = useState(0);

  return (
    <Box sx={{}}>
      <Typography variant="h1" component="div" gutterBottom sx={{ flexGrow: 1, fontSize: '25px', textAlign: 'center', color: 'white', bgcolor: "rgba(38, 7, 1, 0.6)", borderRadius: 1 }}>
        Ventas
      </Typography>
      <Box sx={{ bgcolor: 'brown', borderRadius: 2 }}>
        <TextField label="Productos" sx={{ width: 400, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Precio" sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Cantidad" sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Subtotal" sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <Button variant='contained' sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", }} >Agregar</Button>
        <Button variant='contained' sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", bgcolor: "black" }} >Cancelar</Button>
        <Button variant='contained' sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", bgcolor: "green" }} >Facturar</Button>
      </Box>
      <br />
      <DataGrid disableColumnFilter={true} sx={{ height: 400, bgcolor: 'white' }}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
          Footer: CustomFooterTotalComponent
        }}
        componentsProps={{
          footer: { subtotal, impuesto, total },
        }}

        onStateChange={() => {
          let res = [];
          Object.assign(res, rows);
          console.log(res);
          const subtotal = res
            .map((item) => item.subtotal)
            .reduce((a, b) => a + b, 0);
          console.log(subtotal);
          setSubTotal(subtotal);
          setImpuesto(subtotal * 0.13);
          setTotal(impuesto + subtotal);
        }}
      />
    </Box>
  )
}

export default Ventas





