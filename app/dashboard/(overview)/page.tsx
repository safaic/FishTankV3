'use client';
import { DarkThemeProvider } from '@/app/ui/themes/dark';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Nerko_One } from 'next/font/google';
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
            <Suspense fallback={
              <div className="flex justify-center items-center h-40 text-gray-200">
                Loading...
              </div>
            }>
                <ReusableLineChart key={refreshTrigger} data={chartData} />
              
            </Suspense>
          </Paper>

     
          <Paper elevation={3} className="bg-gray-200 p-6 mb-6">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minWidth: '800px' }}>
              <Box sx={{ flex: 1 }}>
                <Suspense fallback={
                  <div className="flex justify-center items-center h-40 text-gray-400">
                    Loading...
                  </div>
                }>
                  <PerameterChart onDataChange={handleDataChange} />
                </Suspense>
              </Box>
              <Box sx={{ ml: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <DatePicker label="Start Date"  value={startDate}
                      onChange={handleStartDateChange}/>
                    <DatePicker label="End Date" value={endDate}
                      onChange={handleEndDateChange}
                      disabled={!startDate} // Disable if no start date
                      minDate={startDate || undefined}/>
                  </Box>
                </LocalizationProvider>
              </Box>
            </Box>
          </Paper>
        
        </Container>
        
      </Box>
      
      
      </main>
      
  );
}