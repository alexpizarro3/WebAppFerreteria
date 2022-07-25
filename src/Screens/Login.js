import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';


export default function Login() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop="2%"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <CssTextField label="Cédula" helperText="Ingrese su Cédula sin guiones 199997777" id="custom-css-outlined-input" variant="filled" sx={{ width: 300, bgcolor: "#fefae0", borderRadius: 1, boxShadow: 10 }} />
        <br />
        <br />
        <CssTextField label="Contraseña" helperText="Contraseña max 20 caracteres" id="custom-css-outlined-input" variant="filled" sx={{ width: 300, bgcolor: "#fefae0", borderRadius: 1 , boxShadow: 10}} />
        <br />
        <br />
        <Button variant="contained" color="primary" sx={{ width: 300, bgcolor:"#2b2d42" }}>Ingresar</Button>
      </Grid>
    </Grid>
  )
}

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
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



