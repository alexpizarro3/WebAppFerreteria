import React from 'react'
import { styled } from "@mui/system"; 
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

function Styledbackicon() {
  return (
    <div>
      <StyledBackIcon  sx={{color: '#0a100d', fontSize: 50, paddingRight: 3}}></StyledBackIcon>
    </div>
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
