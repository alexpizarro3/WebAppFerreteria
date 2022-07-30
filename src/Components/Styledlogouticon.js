import React from 'react' //Funcion que da estilo a botones para luego ser reutilizados
import { styled } from "@mui/system";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';

function Styledlogouticon() {
  return (
    <Link to="/">
      <StyledLogoutIcon sx={{ color: "rgba(0, 48, 73, 0.9)", fontSize: 45, marginLeft: '1rem' }}></StyledLogoutIcon>
    </Link>
  )
}

const StyledLogoutIcon = styled(LogoutIcon, {
  name: "StyledLogoutIcon",
  slot: "Wrapper"
})({
  color: "goldenrod",
  "&:hover": { color: "#9d0208" }
});

export default Styledlogouticon
