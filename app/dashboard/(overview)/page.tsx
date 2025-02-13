'use client';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { RevenueChartSkeleton} from '@/app/ui/skeleton';
import React, { useRef, useEffect } from 'react';



import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(210, 100%, 60%)',
      light: 'hsl(210, 100%, 70%)',
      dark: 'hsl(210, 100%, 38%)',
    },
    background: {
      default: 'hsl(210, 10%, 4%)',
      paper: 'hsla(210, 14%, %, 0.8)',
    },
    text: {
      primary: '#fff',
      secondary: 'hsl(215, 15%, 75%)'
    }
  },
  typography: {
    fontFamily: '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)',
      fontWeight: 600
    }
    
  },

  
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(210, 10%, 4%)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowY: 'scroll'
        }
      }
    }
  }

  
});

const PerameterChart = dynamic(
  () => import('@/app/ui/dashboard/peramchart'),
);

const ReusableLineChart = dynamic(
  () => import('@/app/ui/dashboard/peramgraph'),
);

export interface ChartData {
  date: any;
  peram: string;
  level: number;
}

export default function Page() {



  
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const formatDate = (value: any) => {
    const date = new Date(value);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };
  const [perameter, setPerameter] = useState('');

  const handlePeramFilterChange = (event: SelectChangeEvent) => {
    setPerameter(event.target.value);
  };

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
   console.log(formatDate(newValue));
   setEndDate(null); 
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
   console.log(formatDate(newValue));
  };

  const handleDataChange = (data: ChartData[]) => {
    setChartData(data);
    setRefreshTrigger(prev => prev + 1);
  };

  
  return (
    <main>
<ThemeProvider theme={theme}> 

      <Box className="min-h-screen dark:bg-[#121212] py-8" boxSizing={'border-box'} maxWidth={'100%'}>
        <Container className=" dark:bg-[#121212] rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
          <Paper elevation={3} className="bg-gray-800 p-6 mb-6 overflow-auto">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minWidth: '100px',boxShadow: 1, p: 2, borderRadius: 1 }}  >
            <Suspense fallback={<Skeleton />}>
     
        
                <ReusableLineChart key={refreshTrigger} data={chartData}  />
              
            </Suspense>
            </Box>
          </Paper>

     <div> 

    
          <Paper elevation={3} className="p-6 mb-6 overflow-auto"> 
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', boxSizing: 'border-box' }} >
              <Box sx={{ flex: 1, maxWidth: '600px',boxSizing: 'border-box',boxShadow: 1, p: 2, borderRadius: 1 }} > 
              <Suspense fallback={<RevenueChartSkeleton />}> 
                  <PerameterChart onDataChange={handleDataChange} startDate={startDate} endDate={endDate} peramValue={perameter} />
                </Suspense>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, boxShadow: 1, p: 2, borderRadius: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <Box display="flex" flexDirection="column" gap={2} >
                      <DatePicker  
                        label="Start Date"  
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <DatePicker 
                      
                        label="End Date" 
                        value={endDate}
                        onChange={handleEndDateChange}
                        disabled={!startDate}
                        minDate={startDate || undefined}
                      />
                    </Box>


                  </LocalizationProvider>
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Element Selection</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={perameter}
                      label="Element Selection"
                      onChange={handlePeramFilterChange}
                     
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'alk'}>Alkinity</MenuItem>
                      <MenuItem value={'mag'}>Magnesium</MenuItem>
                      <MenuItem value={'ca'}>Calcium</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Paper>
           </div>
        
        </Container>
        
      </Box>
      
      </ThemeProvider>
      </main>
      
  );
}