import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({
  getRowId,
  rows,
  columns,
  cellValues,
}) => {

  return (
    <div style={{ height: 350, width: '75%', marginLeft: '9rem'}} >
      <DataGrid sx={{ bgcolor: "rgba(38, 7, 1, 0.6)", color: "white" , borderColor: "white" }} 
      getRowId={getRowId} rows={rows} columns={columns} cellValues={cellValues} 
      />
      
    </div>
    
  );
}
export default DataTable
