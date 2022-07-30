import React from 'react'
import { styled } from "@mui/system"; 
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

function Styledbackicon() {
  return (
    <div>
      <StyledBackIcon  sx={{color: "rgba(0, 48, 73, 0.9)", fontSize: 50, paddingRight: 3, marginLeft: '10rem'}}></StyledBackIcon>
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
