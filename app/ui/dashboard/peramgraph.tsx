"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState, useEffect } from 'react';

interface ChartData {
  date: Date;
  peram: string;
  level: number;
}
interface LineChartProps {
  width?: number;
  height?: number;
  data: ChartData[];
}

export default function ReusableLineChart({ width = 500, height = 300, data }: LineChartProps) {
  const [chartData, setChartData] = useState<{
    dates: number[];
    alkLevels: (number | null)[];
    magLevels: (number | null)[];
  }>({ dates: [], alkLevels: [], magLevels: [] });

  useEffect(() => {
    const allDates = [...new Set(data.map((row: any) => new Date(row.date).getTime()))].sort();
    const alkLevels = new Array(allDates.length).fill(null);
    const magLevels = new Array(allDates.length).fill(null);

    data.forEach((row: any) => {
      const dateIndex = allDates.indexOf(new Date(row.date).getTime());
      if (row.peram === 'alk') {
        alkLevels[dateIndex] = row.level;
      } else if (row.peram === 'mag') {
        magLevels[dateIndex] = row.level / 100;
      }
    });

    setChartData({ dates: allDates, alkLevels, magLevels });
  }, [data]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
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
            color: 'rgb(2, 213, 209)',
            data: chartData.alkLevels, 
            label: 'Alkalinity',
            connectNulls: true,
          },
          { 
            color: 'rgb(213, 90, 2)',
            data: chartData.magLevels, 
            label: 'Magnesium',
            connectNulls: true,
          }
        ]}
        width={width}
        height={height}
        slotProps={{
          legend: {
           
            position: {
              vertical: 'top',
              horizontal: 'right',
            },
            itemMarkWidth: 20,
            itemMarkHeight: 2,
            markGap: 5,
            itemGap: 10,
          }
        }}
      />
    </Box>
  );
}