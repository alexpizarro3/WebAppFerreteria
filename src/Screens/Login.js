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
      marginTop="6%"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <CssTextField label="Custom CSS" id="custom-css-outlined-input" variant="filled" sx={{ width: 300 }} />
        <br />
        <br />
        <TextField id="filled-basic" label="Password" variant="filled" sx={{ width: 300 }} />
        <br />
        <br />
        <Button variant="contained" color="primary" sx={{ width: 300 }}>Login</Button>
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



