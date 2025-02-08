"use client" 
import * as React from 'react';
import {users, fish, Peram} from '@/app/lib/placeholder-data';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  GRID_ACTIONS_COLUMN_TYPE,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { abort } from 'process';
import { idID } from '@mui/material/locale';

// const rows: GridRowsProp = Peram.map((row) => ({
//   id: row.date,
//   date: row.date,
//   peram: row.peram,
//   level: row.level,
// }));

// const columns: GridColDef[] = [
//   { field: 'date', headerName: 'Date', width: 150 },
//   { field: 'peram', headerName: 'Perameter', width: 150 },
//   { field: 'level', headerName: 'Value', width: 150 },
// ];

// export default function PerameterChart() {
//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} />
//     </div>
//   );
// }

// function dataComponent() { 

//   React.useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/api/perameter');
//       const data = await response.json();
//       const initialRows: GridRowsProp = data.map((row: { id: number; date: string; peram: string; level: number }) => ({
//         id: row.id,
//         date: row.date,
//         peram: row.peram,
//         level: row.level,
//       }));
//       setRows(initialRows);
//       console.log(JSON.stringify(initialRows))
//     };

//     fetchData();
//   }, []);
// }


// const initialRows: GridRowsProp = Peram.map((row) => ({
//   id: row.id,
//   date: row.date,
//   peram: row.peram,
//   level: row.level,
// }));


var a = false
declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
    rowModesModel: GridRowModesModel;
    rows: GridRowsProp;
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const { setRows, setRowModesModel, rows } = props;
  
  const handleClick = () => {
    console.log(a)
    if (a != true || rows.length === 0) 
      {
      a = true
    const maxId = Math.max(...rows.map(row => row.id));
    const id = maxId + 1;
    setRows((oldRows) => [
      ...oldRows,
      { id, peram: '', level: '', isNew: true },
     
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'peram' },
    }));
        
  }
  
  else {
    alert("Only Add One Record at a Time");
  };
}



  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
  
}

export default function PerameterChart() {

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const fetchData = async () => {
    try {
      const response = await fetch('/api/perameter');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      const initialRows = data.map((row: any) => ({
        id: row.id,
        date: new Date(row.date),
        peram: row.peram,
        level: row.level,
      }));
      
      setRows(initialRows);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };
  // Add useEffect to fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/perameter');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        const initialRows = data.map((row: any) => ({
          id: row.id,
          date: new Date(row.date),
          peram: row.peram,
          level: row.level,
        }));
        
        setRows(initialRows);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
  
    fetchData();
  }, []);

  
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  
  const handleSaveClick = (id: GridRowId) =>  async() => {
    const editedRow = rows.find((row) => row.id === id);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log('handleSaveClick')
    
    console.log('Thisis' + editedRow!.isNew)
    if (editedRow?.isNew === true) {

        a = false
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    await processRowDelete(id);
    await fetchData(); // Refresh after delete
  };

  const handleCancelClick = (id: GridRowId) => () => {
    const rowCheck = rows.find((row) => row.id === id);
    
    if (rowCheck?.isNew === true){
    a = false
  }

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }, 
    }) ;

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
  try {
    // Determine if this is a new row or update
    const method = newRow.isNew ? 'POST' : 'PUT';
    
      if (newRow.peram === undefined || (newRow.level === undefined ||newRow.level === '') || newRow.date === undefined || newRow.id === undefined) {
        alert("Please Enter All Fields");
     
        return;
      }
    
    const response = await fetch('/api/perameter', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: newRow.id,
        date: newRow.date,
        peram: newRow.peram,
        level: newRow.level
      }),
     
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedRow = { ...newRow, isNew: false };
    await fetchData(); 
    
    return updatedRow;
  } catch (error) {
    console.error('Error saving row:', error);
    throw error;
  }

};

const processRowDelete = async (id: GridRowId) => {
  try {
    // Determine if this is a new row or update
    const method = 'DELETE';
    
    const response = await fetch('/api/perameter', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
     
    }
    
  );
  
    if (!response.ok) {
      throw new Error('Failed to delete record');
    }

    setRows(rows.filter((row) => row.id !== id));
    await fetchData(); 
  } catch (error) {
    console.error('Delete Error:', error);
  }
};
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
// On Errors

const handleProcessRowUpdateError = React.useCallback((error: Error) => {
  // console.error('Error saving row:', error);
}, []);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150, },
    { field: 'date', headerName: 'Date', width: 150, type: 'date', editable: true,valueFormatter: (value) => {
      const date = new Date(value);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${month}/${day}/${year}`; // Format date as MM/DD/YYYY
    } },  
    { field: 'peram', headerName: 'Perameter', width: 150, valueOptions: ['alk', 'mag'], editable: true, type: 'singleSelect' },
    { field: 'level', headerName: 'Value', width: 150, type: 'number' ,editable: true  },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
       
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => processRowDelete(id)}
            
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
      initialState={{
        columns: {
          columnVisibilityModel: {
            // Hide columns status and traderName, the other columns will remain visible
            id: false,
  
          },
        },
      }}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rowModesModel, rows },
        }}
        
        
      />
    </Box>
    
  );
  
}


// function setRows(initialRows: readonly GridValidRowModel[]) {
//   throw new Error('Function not implemented.');
// }
  