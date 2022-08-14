import React, { useEffect, useState, useRef, useContext } from 'react'
import userContextUsuario from '../Components/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CustomFooterTotalComponent } from '../Components/customFooter';
import { Button, Typography } from '@mui/material';
import { obtenerProductos } from '../Components/Api';
import MenuItem from '@mui/material/MenuItem';

const columns = [
  { field: 'id', headerName: 'Id', width: 50, headerAlign: 'center', },
  { field: 'idProducto', headerName: 'Id Producto', width: 100, headerAlign: 'center', },
  { field: 'Nombre', headerName: 'Producto', width: 275, editable: true, },
  { field: 'Cantidad', headerName: 'Cantidad', type: 'number', width: 150, editable: true, },
  { field: 'PrecioVenta', headerName: 'Precio de Venta', type: 'number', width: 200, editable: true, },
  { field: 'SubTotal', headerName: 'SubTotal', description: 'Subtotal de Multiplicar Cantidad x Precio', type: 'number', width: 150, editable: true, },
  {
    field: 'iva', headerName: 'IVA', description: 'Multiplicar Subtotal * 13%', type: 'number', width: 150,
    valueGetter: (params) =>
      `${params.row.SubTotal}` * 0.13,
  },
];

const Ventas = () => {
  const { userContext, setUserContext } = useContext(userContextUsuario);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [impuesto, setImpuesto] = useState(0);
  const [listProd, setListProd] = useState([]);
  const [rows, setRows] = useState([]);
  const [idProducto, setIdProducto] = useState("");
  const [desProducto, setDesProducto] = useState("");
  const [prProducto, setPrProducto] = useState(0);
  const [subTotalItem, setSubTotalItem] = useState(0);
  const [cantItem, setCantItem] = useState("");
  const textCantidad = useRef(null);

  const fetchData = async () => {
    const loaddata = await obtenerProductos();
    setListProd(loaddata);
  }

  useEffect(() => {
    fetchData();
  }, []);

  listProd.forEach(prod => {
    prod['label'] = prod.Nombre;
  });

  const handleChange = (event) => {
    setIdProducto(event.target.value);
    prodSelect(event.target.value);
  };

  const prodSelect = (id) => {
    let selected = listProd.find(prod => prod.IdProducto === id);
    setPrProducto(selected.PrecioVenta);
    setDesProducto(selected.Nombre);
    focus();
  };

  const focus = () => {
    textCantidad.current.focus();
  };

  const cantProductos = e => {
    setCantItem(e.target.value);
  };

  const prcantChange = () => {
    const res = prProducto * cantItem;
    setSubTotalItem(res);
  };

  let idCounter = 0;
  const createNewRow = () => {
    idCounter = rows.length + 1; //aumenta el lenght del arreglo para asignar el nuevo id del gridview item
    return { id: idCounter, idProducto: idProducto, Nombre: desProducto, Cantidad: cantItem, PrecioVenta: prProducto, SubTotal: subTotalItem };
  };

  const handleAddRow = () => { //funcion que agrega una fila nueva al grid usando los states de cada variable
    setRows((prevRows) => [...prevRows, createNewRow()]); //
  };

  return (
    <Box sx={{}}>
      <Typography variant="h1" component="div" gutterBottom sx={{ flexGrow: 1, fontSize: '25px', textAlign: 'center', color: 'white', bgcolor: "rgba(38, 7, 1, 0.6)", borderRadius: 1 }}>
        Ventas
      </Typography>
      <Box sx={{ bgcolor: 'brown', borderRadius: 2 }}>
        <TextField select value={idProducto} label="Productos" onChange={handleChange} type="search" sx={{ width: 258, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }}>
          {listProd.map((option) => (
            <MenuItem key={option.IdProducto} value={option.IdProducto}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Precio" value={prProducto} inputRef={textCantidad} onFocus={prcantChange} sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Cantidad" value={cantItem} defaultValue="0" type="number" onChange={cantProductos} onFocus={prcantChange} sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Subtotal" value={subTotalItem} onFocus={prcantChange} sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "18px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Tipo Venta" InputProps={{
          endAdornment: (
            <datalist id="rfc">
              <option value="Efectivo"></option>
              <option value="Tarjeta"></option>
            </datalist>
          ),
          inputProps: {
            list: "rfc"
          }
        }}
          sx={{ width: 125, margin: "0.5rem", "& label": { color: "black", fontSize: "14px" }, bgcolor: "orange", borderRadius: 1, boxShadow: 10 }} />
        <Button variant='contained' onClick={handleAddRow} sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", }} >Agregar</Button>
        <Button variant='contained' sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", bgcolor: "black" }} >Cancelar</Button>
        <Button variant='contained' sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", bgcolor: "green" }} >Facturar</Button>
      </Box>
      <br />
      <DataGrid disableColumnFilter={true} sx={{ height: 400, bgcolor: 'white', align: 'center' }}
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





