import React from 'react'
import { styled } from "@mui/system";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function Styledbackicon() {
  return (
    <Link to='/usuarios'>
      <Tooltip title="Volver" placement='bottom'>
        <StyledBackIcon sx={{ color: "rgba(0, 48, 73, 0.9)", fontSize: 50, paddingRight: 3, marginLeft: '1rem' }}></StyledBackIcon>
      </Tooltip>
    </Link>
  )
}

const StyledBackIcon = styled(KeyboardReturnOutlinedIcon, {
  name: "StyledBackIcon",
  slot: "Wrapper"
})({
  color: "goldenrod",
  "&:hover": { color: "#9d0208" }
});

export default Styledbackicon
