import React from 'react' //Funcion que da estilo a botones para luego ser reutilizados
import { styled } from "@mui/system"; 
import LogoutIcon from '@mui/icons-material/Logout';

function Styledlogouticon() {
  return (
    <div>
      <StyledLogoutIcon sx={{color: '#0a100d', fontSize: 45}}></StyledLogoutIcon>     
    </div>
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
