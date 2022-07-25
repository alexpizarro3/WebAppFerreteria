import {AppBar, Toolbar, Box, Typography, Container } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { styled } from "@mui/system";

const StyledLogoutIcon = styled(LogoutIcon, {
  name: "StyledLogoutIcon",
  slot: "Wrapper"
})({
  color: "goldenrod",
  "&:hover": { color: "#9d0208" }
});

export default function MenuTop() {
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
            <Container>
                <Toolbar>
                    <Typography sx={{flexGrow: 1, marginLeft: '29%', fontSize:'47px'}}>
                        <Link to='/' style={{color: '#c1121f', textDecoration: 'none', borderRadius: 2}}>Ferreteria la Cochinita</Link>
                    </Typography>
                    <StyledLogoutIcon sx={{color: '#0a100d', fontSize: 45}}></StyledLogoutIcon>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  );
}




