import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({
  getRowId,
  rows,
  columns,
}) => {

  return (
    <div style={{ height: 450, width: '90%', marginLeft: '3rem'}} >
      <DataGrid sx={{ bgcolor: "rgba(38, 7, 1, 0.6)", color: "white" , borderColor: "white" }} 
      getRowId={getRowId} rows={rows} columns={columns} 
      />
    </div>
    
  );
}
export default DataTable
