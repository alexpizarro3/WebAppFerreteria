import React, { useEffect, useState, useRef, useContext } from 'react'
import userContextUsuario from '../Components/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CustomFooterTotalComponent } from '../Components/customFooter';
import { Button, Typography } from '@mui/material';
import { obtenerProductos, postDetalleVenta } from '../Components/Api';
import Config from '../Components/Config'; //Importa el componente Config.js
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';


const columns = [
  { field: 'id', headerName: 'Id', width: 50, headerAlign: 'center', },
  { field: 'IdProducto', headerName: 'Id Producto', width: 100, headerAlign: 'center', },
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
  const [total, setTotal] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [impuesto, setImpuesto] = useState("");
  const [listProd, setListProd] = useState([]);
  const [rows, setRows] = useState([]);
  const [idProducto, setIdProducto] = useState("");
  const [desProducto, setDesProducto] = useState("");
  const [prProducto, setPrProducto] = useState(0);
  const [subTotalItem, setSubTotalItem] = useState(0);
  const [cantItem, setCantItem] = useState("");
  const [tipoVenta, setTipoVenta] = useState();
  const [venta, setVenta] = useState({});
  const [detalleVenta, setDetalleVenta] = useState([]);
  const dirPostVenta = Config.CREAR_VENTA; //Post
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
    return { id: idCounter, IdProducto: idProducto, Nombre: desProducto, Cantidad: cantItem, PrecioVenta: prProducto, SubTotal: subTotalItem };
  };

  const handleAddRow = () => { //funcion que agrega una fila nueva al grid usando los states de cada variable
    setRows((prevRows) => [...prevRows, createNewRow()]); //
  };

  const handleTipoVenta = e => {
    setTipoVenta(e.target.value);
  };

  const handlePostVenta = async () => {
    await axios.post(dirPostVenta, venta)
      .then((response) => {
        const resp = response.data; //retorna el resultado en formato json
        handlePostDetalleVenta(resp.IdVenta);
      }).catch(error => {
        console.log(error);
      })
  };

  console.log(detalleVenta);

  const handlePostDetalleVenta = (idVenta) => {
    const newDetalleVenta = [];
    Object.assign(newDetalleVenta, detalleVenta);
    console.log(newDetalleVenta);
    newDetalleVenta.forEach(async detalle => {
      detalle['IdVenta'] = idVenta;
      delete detalle.Nombre;
      delete detalle.id;
      detalle.SubTotal = detalle.SubTotal.toString();
      console.log(detalle.SubTotal);
      console.log(detalle);
      const res = await postDetalleVenta(detalle);
      console.log(res);
    });
  };

  console.log(userContext);

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
        <TextField label="Tipo Venta" onChange={handleTipoVenta} InputProps={{
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
        <Button variant='contained' onClick={handlePostVenta} sx={{ margin: "0.5rem", height: "3.5rem", width: "5.5rem", bgcolor: "green" }} >Facturar</Button>
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
          const SubTotal = res
            .map((item) => item.SubTotal)
            .reduce((a, b) => a + b, 0);
          setDetalleVenta(res);
          setSubTotal(SubTotal);
          setImpuesto(SubTotal * 0.13);
          setTotal(impuesto + SubTotal);
          const hoy = new Date();
          setVenta({ CedulaUsuario: userContext, Tipo: tipoVenta, Fecha: hoy.toISOString() });
        }}
      />
    </Box>
  )
}

export default Ventas





