'use client';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Nerko_One } from 'next/font/google';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import { RevenueChartSkeleton} from '@/app/ui/skeleton';

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

   
      <Box className="min-h-screen bg-gray-200 py-8">
        <Container maxWidth="lg">
          <Paper elevation={3} className="bg-gray-200 p-6 mb-6">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minWidth: '800px' }}>
            <Suspense fallback={<Skeleton />}>
     
        
                <ReusableLineChart key={refreshTrigger} data={chartData} />
              
            </Suspense>
            </Box>
          </Paper>

     
          <Paper elevation={3} className="bg-gray-200 p-6 mb-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minWidth: '800px' }}>
              <Box sx={{ flex: 1 }}>
              <Suspense fallback={<RevenueChartSkeleton />}> 
                  <PerameterChart onDataChange={handleDataChange} startDate={startDate} endDate={endDate} peramValue={perameter} />
                </Suspense>
              </Box>
              <Box sx={{ ml: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box display="flex" flexDirection="column" gap={2}>
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
                      <MenuItem value={'Calcium'}>Calcium</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Paper>
        
        </Container>
        
      </Box>
      
      
      </main>
      
  );
}