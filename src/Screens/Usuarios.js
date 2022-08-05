import { Container, Typography, Box } from '@mui/material'
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Link } from 'react-router-dom';
import UserTable from '../Components/UserTable';
import { Tooltip } from '@mui/material';


export default function Usuarios() {
  return (
    <Container >
      <Typography sx={{ color: 'black', fontSize: '40px', textAlign: 'center', verticalAlignment: 'center', marginLeft: '18rem' }}>
        Usuarios
        <Link to='/dashboard'>
          <Tooltip title='Dashboard' placement='left' aria-details='Indicadores'>
            <AssessmentOutlinedIcon sx={{ color: '#ffe100', fontSize: 70, marginLeft: '10rem' }}></AssessmentOutlinedIcon>
          </Tooltip>
        </Link>
        <Link to='/productos'>
          <Tooltip title='Productos' placement='right' aria-details='Mantenimiento'>
            <ConstructionOutlinedIcon sx={{ color: '#9a031e', fontSize: 70, marginLeft: '3rem' }}></ConstructionOutlinedIcon>
          </Tooltip>
        </Link>
      </Typography>
      <Box >
        <UserTable />
      </Box>
    </Container>
  )
}
