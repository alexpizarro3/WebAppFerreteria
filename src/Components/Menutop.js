import { AppBar, Toolbar, Box, Typography, Container } from '@mui/material';
import Styledlogouticon from './Styledlogouticon'
import Styledbackicon from './Styledbackicon';


export default function MenuTop() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent'>
                <Container>
                    <Toolbar>
                        <Typography variant="h2" component="div" gutterBottom sx={{flexGrow: 1, marginLeft: '20rem', marginTop: '3px',fontSize: '47px', color: 'white', bgcolor: "rgba(38, 7, 1, 0.6)", borderRadius:1 }}>
                            Ferreteria la Cochinita
                        </Typography>
                        <Styledbackicon></Styledbackicon>
                        <Styledlogouticon></Styledlogouticon>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}




