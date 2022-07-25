import {AppBar, Toolbar, Button, Box, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MenuTop() {
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography sx={{flexGrow: 1, textAlign: 'center', fontSize:'30px'}}>
                        <Link to='/' style={{color: '#ba181b', textDecoration: 'none'}}>Ferreteria la Cochinita</Link>
                    </Typography>
                    <Button variant='contained' color= 'primary'>
                        Salir
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  );
}




