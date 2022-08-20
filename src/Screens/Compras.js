import React, { useEffect, useState, useRef, useContext } from 'react'
import userContextUsuario from '../Components/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CustomFooterTotalComponent } from '../Components/customFooter';
import { Button, Typography, Modal } from '@mui/material';
import { obtenerProductos, postDetalleCompra, putCanInv } from '../Components/Api';
import Config from '../Components/Config'; //Importa el componente Config.js
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import sweetalert from 'sweetalert';


const columns = [
  { field: 'id', headerName: 'Id', width: 50, headerAlign: 'center', },
  { field: 'IdProducto', headerName: 'Id Producto', width: 100, headerAlign: 'center', },
  { field: 'Nombre', headerName: 'Producto', width: 275, editable: true, },
  { field: 'Cantidad', headerName: 'Cantidad', type: 'number', width: 150, editable: true, },
  { field: 'PrecioCompra', headerName: 'Precio de Compra', type: 'number', width: 200, editable: true, },
  { field: 'SubTotal', headerName: 'SubTotal', description: 'Subtotal de Multiplicar Cantidad x Precio', type: 'number', width: 150, editable: true, },
  {
    field: 'iva', headerName: 'IVA', description: 'Multiplicar Subtotal * 13%', type: 'number', width: 150,
    valueGetter: (params) =>
      `${params.row.SubTotal}` * 0.13,
  },
];

const Compras = () => {
  const styles = useStyles(); //Aqui se almacenan los estilos
  const { userContext, setUserContext } = useContext(userContextUsuario);
  const [total, setTotal] = useState("");
  const [totalAux, setTotalAux] = useState("");
  const [subtotal, setSubTotal] = useState("");
  const [impuesto, setImpuesto] = useState("");
  const [listProd, setListProd] = useState([]);
  const [rows, setRows] = useState([]);
  const [idProducto, setIdProducto] = useState("");
  const [desProducto, setDesProducto] = useState("");
  const [prProducto, setPrProducto] = useState(0);
  const [subTotalItem, setSubTotalItem] = useState(0);
  const [cantItem, setCantItem] = useState("");
  const [tipoCompra, setTipoCompra] = useState("");
  const [idCompra, setIdCompra] = useState();
  const [modalCompraExitosa, setModalCompraExitosa] = useState(false);
  const [compra, setCompra] = useState({});
  const [detalleCompra, setDetalleCompra] = useState([]);
  const dirPostCompra = Config.CREAR_COMPRA; //Post
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
    setPrProducto(selected.PrecioCompra);
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
    return { id: idCounter, IdProducto: idProducto, Nombre: desProducto, Cantidad: cantItem, PrecioCompra: prProducto, SubTotal: subTotalItem };
  };

  const handleAddRow = () => { //funcion que agrega una fila nueva al grid usando los states de cada variable
    if (cantItem === "" || tipoCompra === "" || prProducto === 0) {
      sweetalert("Varios campos son necesarios favor revisar....", { icon: "error" });
    }
    else {
      setRows((prevRows) => [...prevRows, createNewRow()]); //
    }
  };

  const handleTipoCompra = e => {
    setTipoCompra(e.target.value);
  };

  const handlePostCompra = async () => {
    if (rows.length === 0) {
      sweetalert("No se han agregado items aun...", { icon: "error" });
    }
    else {
      console.log(dirPostCompra);
      console.log(compra);
      await axios.post(dirPostCompra, compra)
        .then((response) => {
          const resp = response.data; //retorna el resultado en formato json
          setIdCompra(resp.IdCompra);
          handlePostDetalleCompra(resp.IdCompra);
        }).catch(error => {
          console.log(error);
        })
    }
  };

  console.log(detalleCompra);

  const handlePostDetalleCompra = (idCompra) => {
    const newDetalleCompra = [];
    Object.assign(newDetalleCompra, detalleCompra);
    console.log(newDetalleCompra);
    newDetalleCompra.forEach(async detalle => {
      detalle['IdCompra'] = idCompra;
      delete detalle.Nombre;
      delete detalle.id;
      detalle.SubTotal = detalle.SubTotal.toString();
      console.log(detalle.SubTotal);
      console.log(detalle);
      const res = await postDetalleCompra(detalle);
      console.log(res);
      const response = await putCanInv(detalle.IdProducto, { Cantidad: detalle.Cantidad})
      console.log(response);
    });
    abrirCerrarModalCompraExitosa();
  };

  const abrirCerrarModalCompraExitosa = () => {
    setModalCompraExitosa(!modalCompraExitosa);
    setTotalAux(total);
    setSubTotal("");
    setImpuesto("");
    setTotal("");
    setRows([]);
  }

  const bodyCompraExitosa = (
    <div className={styles.modal}>
      <p>Factura {idCompra} agregada exitosamente</p>
      <p>Monto Total de Compra a Facturar = {totalAux} </p>
      <div align="center">
        <Link to="/Compras/">
          <Button variant="contained" color="primary" sx={{ marginRight: "2rem" }} onClick={() => abrirCerrarModalCompraExitosa()}>Aceptar</Button>
        </Link>
      </div>
    </div>
  )

  return (
    <Box >
      <Typography variant="h1" component="div" gutterBottom sx={{ flexGrow: 1, fontSize: '25px', textAlign: 'center', color: 'white', bgcolor: "rgba(38, 7, 1, 0.6)", borderRadius: 1 }}>
        Compras
      </Typography>
      <Box sx={{ bgcolor: '#03045e', borderRadius: 2 }}>
        <TextField select value={idProducto} label="Productos" onChange={handleChange} type="search" sx={{ color: "white", width: 258, margin: "0.5rem", "& label": { color: "white", fontSize: "18px" }, bgcolor: "#219ebc", borderRadius: 1, boxShadow: 10 }}>
          {listProd.map((option) => (
            <MenuItem key={option.IdProducto} value={option.IdProducto}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Precio" value={prProducto} inputRef={textCantidad} onFocus={prcantChange} sx={{ color: "white", width: 125, margin: "0.5rem", "& label": { color: "white", fontSize: "18px" }, bgcolor: "#219ebc", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Cantidad" value={cantItem} defaultValue="0" type="number" onChange={cantProductos} onFocus={prcantChange} sx={{ color: "white", width: 125, margin: "0.5rem", "& label": { color: "white", fontSize: "18px" }, bgcolor: "#219ebc", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Subtotal" value={subTotalItem} onFocus={prcantChange} sx={{ color: "white", width: 125, margin: "0.5rem", "& label": { color: "white", fontSize: "18px" }, bgcolor: "#219ebc", borderRadius: 1, boxShadow: 10 }} />
        <TextField label="Tipo Compra" onChange={handleTipoCompra} InputProps={{
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
          sx={{ width: 125, margin: "0.5rem", "& label": { color: "white", fontSize: "14px" }, bgcolor: "#219ebc", borderRadius: 1, boxShadow: 10 }} />
        <Button variant='contained' onClick={handleAddRow} sx={{ margin: "0.5rem", height: "3.5rem", width: "8.8rem", bgcolor: "#fb8500" }} >Agregar</Button>
        <Button variant='contained' onClick={handlePostCompra} sx={{ margin: "0.5rem", height: "3.5rem", width: "8.8rem", bgcolor: "#ffb703" }} >Facturar</Button>
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
          setDetalleCompra(res);
          setSubTotal(SubTotal);
          setImpuesto(SubTotal * 0.13);
          setTotal(impuesto + SubTotal);
          const hoy = new Date();
          setCompra({ CedulaUsuario: userContext, Tipo: tipoCompra, Fecha: hoy.toISOString() });
        }}
      />
      <Box>
        <Modal sx={{ left: "35%", textAlign: "center", marginTop: "23rem", marginBottom: "3rem", bgcolor: "rgba(38, 7, 1, 0.6)", width: "30rem", height: "9rem", color: "white", borderRadius: "5px" }}
          open={modalCompraExitosa}
          onClose={abrirCerrarModalCompraExitosa}>
          {bodyCompraExitosa}
        </Modal>
      </Box>
    </Box>
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

export default Compras

