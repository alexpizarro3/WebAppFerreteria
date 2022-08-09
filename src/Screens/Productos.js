import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Modal, TextField, Button } from '@mui/material';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import DataTable from '../Components/DataTable';
import styled from '@emotion/styled';
import { delUser, obtenerUsuarios, postUser, putUser } from '../Components/Api'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Productos = () => {
  return (
    <Container >
      <Typography sx={{ color: 'black', fontSize: '40px', textAlign: 'center', verticalAlignment: 'center', marginLeft: '22rem' }}>
        Productos
        <Tooltip title='Nuevo Producto' placement='left' aria-details='Nuevo'>
          <AddToPhotosOutlinedIcon color="primary" role="button" tabIndex={0} sx={{ color: '#blue', fontSize: 50, marginLeft: '8rem' }} ></AddToPhotosOutlinedIcon>
        </Tooltip>
        <Link to='/dashboard'>
          <Tooltip title='Dashboard' placement='top' aria-details='Indicadores'>
            <AssessmentOutlinedIcon sx={{ color: '#ffe100', fontSize: 50, marginLeft: '2rem' }}></AssessmentOutlinedIcon>
          </Tooltip>
        </Link>
        <Link to='/usuarios'>
          <Tooltip title='Usuarios' placement='right' aria-details='Mantenimiento'>
            <PeopleAltIcon sx={{ color: '#9a031e', fontSize: 50, marginLeft: '2rem' }}></PeopleAltIcon>
          </Tooltip>
        </Link>
      </Typography>
    </Container>
  )
}

export default Productos

