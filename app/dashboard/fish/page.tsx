'use client';
export default function Page() { 


}
// import { useState } from 'react';
// import { Dayjs } from 'dayjs';
// import { SelectChangeEvent } from '@mui/material';
// import PerameterChart from '@/app/ui/dashboard/peramgraph';
// import { Box, Container, Paper } from "@mui/material";

// interface ChartData {
//   id: number;
//   date: string;
//   peram: string;
//   level: number;
// }

// const ChartData = [
//   { date: '2024-03-01', peram: 'alk', level: 8.2 },
//   { date: '2024-03-01', peram: 'mag', level: 1350 },
//   { date: '2024-03-01', peram: 'ca', level: 420 },

// ];

// // const ReusableLineChart = dynamic(
// //   () => import("@/app/ui/dashboard/peramgraph"),
// // );
// export default function Page() {
//   const [chartData, setChartData] = useState<ChartData[]>([]);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);
//   const [startDate, setStartDate] = useState<Dayjs | null>(null);
//   const [endDate, setEndDate] = useState<Dayjs | null>(null);
//   const [perameter, setPerameter] = useState("");

//   const formatDate = (value: any) => {
//     if (!value) return '';
//     const date = new Date(value);
//     const year = date.getUTCFullYear();
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//     const day = String(date.getUTCDate()).padStart(2, "0");
//     return `${month}/${day}/${year}`;
//   };

//   const handlePeramFilterChange = (event: SelectChangeEvent) => {
//     setPerameter(event.target.value);
//   };

//   const handleStartDateChange = (newValue: Dayjs | null) => {
//     setStartDate(newValue);
//     setEndDate(null);
//   };

//   const handleEndDateChange = (newValue: Dayjs | null) => {
//     setEndDate(newValue);
//   };

//   const handleDataChange = (data: ChartData[]) => {
//     setChartData(sampleData);
//     setRefreshTrigger((prev) => prev + 1);
//   };

//   return (
//     <Box
//   sx={{
//     width: '100%',
//     maxWidth: {
//       xs: '414px',
//       sm: '100%'
//     },
//     height: {
//       xs: '100vh',
//       sm: '100%'
//     },
//     display: 'flex',
//     flexDirection: 'column',
//     padding: 0,  // Remove padding
//     margin: 0,   // Remove margin
//     '& > *': {
//       maxWidth: '100%',
//       maxHeight: '100%',
//       overflow: 'auto',
//       margin: 0,  // Remove child margins
//       padding: 0  // Remove child padding
//     }
//   }}
// >
//   <Box sx={{
//     flex: 1,
//     overflow: 'auto',
//     maxHeight: '100vh',
//     maxWidth: '100%',
//     margin: 0,
//     padding: 0
//   }}>
//     <PerameterChart
//       data={ChartData}
//     />
//   </Box>
// </Box>

//   );
// }
