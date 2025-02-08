"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
interface LineChartProps {
  width?: number;
  height?: number;
}

export default function ReusableLineChart({ width = 500, height = 300 }: LineChartProps) {
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
    <Box sx={{ width: '100%', minHeight: height }}>
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
            label: 'alk',
            connectNulls: true,
          },
          { 
            data: chartData.magLevels, 
            label: 'mag',
            connectNulls: true,
          }
        ]}
        width={width}
        height={height}
      />
    </Box>
  );
}