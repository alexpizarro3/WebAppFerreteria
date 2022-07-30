import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
export default function Login() {

  const [login, setLogin] = useState({ //funcion que almacena los valores del login en usestate
    cedula: '',
    password: '',
  });

  const handleChange = e => { //Funcion que recibe por el evento handle change los valores de los text fields
    //console.log(e.target.name, e.target.value); //Captura por consola los valores de los texts
    setLogin({ ...login, [e.target.name]: e.target.value }); //Almacena los valores del onChange en el useState
  };

  console.log(process.env.REACT_APP_USERS);
  const handleSubmit = async (e) => { //Funcion que anula el actualizar el form al dar click en el boton de login
    e.preventDefault(); //Evita la accion inicial del buton en el form
    //console.log(login); //Muestra el objeto obtenido del useState en consola con los datos de cedula y password
    const res = await fetch(process.env.REACT_APP_USERS + login.cedula + '/' + login.password);
    console.log(res); //
    const data = await res.json();
    console.log(data); //
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop="1%"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <form onSubmit={handleSubmit}>
          <CssTextField label="Cédula" name='cedula' onChange={handleChange} helperText="Ingrese su Cédula sin guiones 199997777" id="custom-css-outlined-input" variant="filled" sx={{ width: 400, "& label": { color: "black", fontSize: "24px" }, bgcolor: "rgba(254, 228, 64, 0.4)", borderRadius: 1, boxShadow: 10 }} FormHelperTextProps={{ style: { color: "black", fontSize: "14px" } }} inputProps={{ style: { fontSize: "20px", textAlign: "center", color: "white" } }} />
          <br />
          <br />
          <CssTextField label="Contraseña" name='password' onChange={handleChange} type="password" helperText="Contraseña max 20 caracteres" id="custom-css-outlined-input" variant="filled" sx={{ width: 400, "& label": { color: "black", fontSize: "20px" }, bgcolor: "rgba(254, 228, 64, 0.4)", borderRadius: 1, boxShadow: 10 }} FormHelperTextProps={{ style: { color: "black", fontSize: "14px" } }} inputProps={{ style: { fontSize: "20px", textAlign: "center", color: "white" } }} />
          <br />
          <br />
          <Button variant="contained" color="primary" type='submit' sx={{ width: 400, bgcolor: "rgba(0, 48, 73, 0.9)" }}>Ingresar</Button>
        </form>
      </Grid>
    </Grid>
  )
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
  },
  '& label.Mui-selected': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'brown',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
  },
});



