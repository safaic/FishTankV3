"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

interface ChartData {
  dates: number[];
  alkLevels: number[];
  magLevels: number[];
  caLevels: number[];
}
interface LineChartProps {
  data: ChartData[];
}

export default function ReusableLineChart({ data }: LineChartProps) {
  const [skeletonController, setSkeletonController] = useState(true);
  const [chartData, setChartData] = useState<ChartData>({
    dates: [],
    alkLevels: [],
    magLevels: [],
    caLevels: [],
  });

  const prepareChartData = (data: any[]) => {
    const allDates = [
      ...new Set(data.map((row) => new Date(row.date).getTime())),
    ].sort();
    const alkLevels = new Array(allDates.length).fill(null);
    const magLevels = new Array(allDates.length).fill(null);
    const caLevels = new Array(allDates.length).fill(null);

    data.forEach((row) => {
      const dateIndex = allDates.indexOf(new Date(row.date).getTime());
      if (row.peram === "alk") {
        alkLevels[dateIndex] = row.level;
      } else if (row.peram === "mag") {
        magLevels[dateIndex] = row.level / 100;
      } else if (row.peram === "ca") {
        caLevels[dateIndex] = row.level / 100;
      }
    });

    return { dates: allDates, alkLevels, magLevels, caLevels };
  };

  const processData = async () => {
    try {
      const newChartData = prepareChartData(data);
      await new Promise<void>((resolve) => {
        setChartData(newChartData);
        resolve();
      });
      setSkeletonController(false);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const timer = setTimeout(() => {
        processData();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400, md: 500 }, // Responsive heights
        position: "relative",
      }}
    >
      {skeletonController ? (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      ) : (
        <LineChart
          xAxis={[
            {
              data: chartData.dates,
              scaleType: "time",
              valueFormatter: (value) => {
                const date = new Date(value);
                return `${String(date.getUTCMonth() + 1).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")}/${date.getUTCFullYear()}`;
              },
            },
          ]}
          series={[
            {
              color: "rgb(2, 213, 209)",
              data: chartData.alkLevels,
              label: "Alkalinity",
              connectNulls: true,
            },
            {
              color: "rgb(213, 90, 2)",
              data: chartData.magLevels,
              label: "Magnesium",
              connectNulls: true,
            },
            {
              color: "rgb(213, 2, 213)",
              data: chartData.caLevels,
              label: "Calcium",
              connectNulls: true,
            },
          ]}
          slotProps={{
            legend: {
              position: {
                vertical: "top",
                horizontal: "right",
              },
              itemMarkWidth: 20,
              itemMarkHeight: 2,
              markGap: 5,
              itemGap: 10,
            },
          }}
        />
      )}
    </Box>
  );
}
