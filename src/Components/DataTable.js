import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { borderColor, color } from '@mui/system';

const DataTable = ({
  getRowId,
  rows,
  columns,
}) => {

  return (
    <div style={{ height: 350, width: '75%', marginLeft: '9rem'}} >
      <DataGrid sx={{bgcolor: "rgba(38, 7, 1, 0.6)", color: "white" , borderColor: "white" }} getRowId={getRowId} rows={rows} columns={columns} />
    </div>
  );
}
export default DataTable
