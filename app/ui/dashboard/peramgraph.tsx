"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';

interface LineChartProps {
  width?: number;
  height?: number;
}

export default function ReusableLineChart({ width = 500, height = 300 }: LineChartProps) {
const [startDate, setStartDate] = React.useState<Date | null>(new Date());
const [endDate, setEndDate] = React.useState<Date | null>(new Date());
const [value, setValue] = useState<Date | null>(null);


  const [chartData, setChartData] = React.useState<{
    dates: number[];
    alkLevels: (number | null)[];
    magLevels: (number | null)[];
  }>({ dates: [], alkLevels: [], magLevels: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/perameter');
        const data = await response.json() as any[];
        
        // Get all unique dates
        const allDates = [...new Set(data.map((row: any) => new Date(row.date).getTime()))].sort();
        
        // Initialize arrays with null values
        const alkLevels = new Array(allDates.length).fill(null);
        const magLevels = new Array(allDates.length).fill(null);
        
        // Map levels to their corresponding dates
        data.forEach((row: any) => {
          const dateIndex = allDates.indexOf(new Date(row.date).getTime());
          if (row.peram === 'alk') {
            alkLevels[dateIndex] = row.level;
          } else if (row.peram === 'mag') {
            magLevels[dateIndex] = row.level / 100;
          }
        });
  
        setChartData({ dates: allDates, alkLevels, magLevels });
      } catch (error) {
        console.error('Fetch Error:', error);
      }

      
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: height }} className="min-h-screen bg-gray-700 py-8">
      {/* <DatePicker value={value} onChange={setValue} /> */}
      
      <LineChart
        xAxis={[{
          data: chartData.dates,
          scaleType: 'time',
          valueFormatter: (value) => {
            const date = new Date(value);
            return `${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCDate()).padStart(2, '0')}/${date.getUTCFullYear()}`;
          },
        }]}
        series={[
          { 
            data: chartData.alkLevels, 
            label: 'Alkalinity',
            connectNulls: true,
          },
          { 
            data: chartData.magLevels, 
            label: 'Magnesium',
            connectNulls: true,
          }
        ]}
        width={width}
        height={height}
      />
    </Box>
  );
}