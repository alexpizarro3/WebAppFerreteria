import { Box, Container, Typography } from '@mui/material'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import DataTable from '../Components/DataTable';
import { Link } from 'react-router-dom'

export default function Usuarios() {
  return (
    <Container >
      <Typography sx={{ color: 'black', fontSize: '40px', textAlign: 'center', marginLeft:'18rem'}}>
        Usuarios
        <Link to='/dashboard'>
          <AssessmentOutlinedIcon sx={{ color: 'black', fontSize: 70, marginLeft: '10rem' }}></AssessmentOutlinedIcon>
        </Link>
        <Link to='/productos'>
          <ConstructionOutlinedIcon sx={{ color: 'black', fontSize: 70, marginLeft: '3rem' }}></ConstructionOutlinedIcon>
        </Link>
      </Typography>
      <Box>
        <DataTable />
      </Box>
    </Container>
  )
}
