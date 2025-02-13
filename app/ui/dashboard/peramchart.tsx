"use client" 
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useEffect, useState, useRef } from 'react';
import { GridFilterModel } from '@mui/x-data-grid'
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
} from '@mui/x-data-grid';
import dayjs, { Dayjs } from 'dayjs';





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
    <GridToolbarContainer > 
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}  >
        Add record
      </Button>
    </GridToolbarContainer>
  );
  
}
interface FilterState {
  columnField: string;
  value: string;
}

interface ChartData {
  id: number;
  date: string;
  peram: string;
  level: number;
}

interface PerameterChartProps {
  onDataChange: (data: ChartData[]) => void;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  peramValue: string | null;

}
export default function PerameterChart({ onDataChange,startDate,endDate,peramValue}: PerameterChartProps) {
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: []
  });
  const [originalRows, setOriginalRows] = useState<GridRowsProp>([]);
  
  const formatDate = (value: any) => {
    const date = new Date(value);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };
  
  const handleFilterChange = (model: GridFilterModel) => {
    setFilterModel(model);
    model.items.forEach((item) => {
      if (item.field === 'date') {
        console.log('Date Filter:', formatDate(item.value));
      } else {
        console.log('Filter:', item.field, item.value);
      }
    });
    console.log('Filter Model:', model);
  };
 
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const initialFetch = useRef(true);
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
     
    
      setOriginalRows(initialRows);  
      setRows(initialRows);       
      onDataChange(data);          

    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };


useEffect(() => {
  // Always start with complete dataset
  let filteredRows = [...originalRows];
  if (startDate && endDate) {
    filteredRows = filteredRows.filter(row => {
      const rowDate = dayjs(row.date);
      return rowDate.isAfter(startDate) && rowDate.isBefore(endDate);
    });
  }
  
  if (peramValue) {
    // Can filter on complete dataset, not just date-filtered rows
    filteredRows = filteredRows.filter(row => row.peram === peramValue);
  }
  
  setRows(filteredRows);

  const data = filteredRows.map((row: any) => ({
    id: row.id,
    date: formatDate(row.date),
    peram: row.peram,
    level: row.level,
  }));

  onDataChange(data);


}, [startDate, endDate, peramValue, originalRows]);

  React.useEffect(() => {
    if (initialFetch.current) {
  
    fetchData();
    initialFetch.current = false;
  }
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
    { field: 'date', headerName: 'Date', width: 150,align: 'left', type: 'date', resizable: false, editable: true,valueFormatter: (value) => {
      const date = new Date(value);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getUTCDate()).padStart(2, '0');
      return `${month}/${day}/${year}`; // Format date as MM/DD/YYYY
    }, },  
    { field: 'peram', headerName: 'Parameter', width: 100, valueOptions: ['alk', 'mag', 'ca'], editable: true,resizable: false, type: 'singleSelect' },
    { field: 'level', headerName: 'Value', width: 100, type: 'number' ,resizable: false,editable: true  },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
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
      sx= {{
        height: '100%',
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
      sx= {{
        height: '100%',
        width: '75%',
        
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
      filterModel={filterModel}
      onFilterModelChange={handleFilterChange}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
        filter: {
          filterModel: {
            items: [],
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
  