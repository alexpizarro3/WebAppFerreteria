import {AppBar, Toolbar, Box, Typography, Container } from '@mui/material';
import Styledlogouticon from './Styledlogouticon'
import { Link } from 'react-router-dom';

export default function MenuTop() {
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography sx={{flexGrow: 1, marginLeft: '29%', fontSize:'47px'}}>
                        <Link to='/' style={{color: '#c1121f', textDecoration: 'none', borderRadius: 2}}>Ferreteria la Cochinita</Link>
                    </Typography>
                    <Styledlogouticon></Styledlogouticon>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  );
}




