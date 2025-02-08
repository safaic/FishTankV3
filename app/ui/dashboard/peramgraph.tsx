"use client"
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/material';


interface LineChartProps {

  width?: number;
  height?: number;
}

export default function ReusableLineChart({ 

  width = 500,
  height = 300
}: LineChartProps) {
  const [chartData, setChartData] = React.useState<{ data: number[], label: string }[]>([]);
  const [xAxisLabels, setXAxisLabels] = React.useState<number[]>([]);
   React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/perameter');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('API Response:', data);
          
          const transformedData = data.map((row: any) => ({        
            date: new Date(row.date),
            peram: row.peram,
            level: row.level,
          }));
          
          interface TransformedData {
            date: Date;
            peram: number;
            level: number;
          }

          interface SeriesData {
            data: number[];
            label: string;
          }

          const seriesData: SeriesData[] = [
            { data: transformedData.map((item: TransformedData) => item.level), label: 'Level' }
          ];
            const labels: number[] = transformedData.map((item: TransformedData): number => item.date.getTime());
  
          setChartData(seriesData);
          setXAxisLabels(labels);
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      };
  
      fetchData();
    }, []);
  
  return (
    <Box sx={{ width: '100%', minHeight: height }}>
      <LineChart
         xAxis={[{ data: xAxisLabels }]}
         series={chartData}
         width={width}
         height={height}
      />
    </Box>
  );
}