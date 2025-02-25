"use client";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import React, { useRef, useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    return "mobile";
  } else {
    return "desktop";
  }
}

const deviceType = getDeviceType();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "hsl(210, 100%, 60%)",
      light: "hsl(210, 100%, 70%)",
      dark: "hsl(210, 100%, 38%)",
    },
    background: {
      default: "hsl(210, 10%, 4%)",
      paper: "hsla(210, 14%, %, 0.8)",
    },
    text: {
      primary: "#fff",
      secondary: "hsl(215, 15%, 75%)",
    },
  },
  typography: {
    fontFamily:
      '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    h1: {
      fontSize: "clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(210, 10%, 4%)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowY: "scroll",
        },
      },
    },
  },
});

const PerameterChart = dynamic(() => import("@/app/ui/dashboard/peramchart"));

const ReusableLineChart = dynamic(
  () => import("@/app/ui/dashboard/peramgraph"),
);

export interface ChartData {
  date: any;
  peram: string;
  level: number;
}

export default function Page() {
  const [chartData, setChartData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const formatDate = (value: any) => {
    const date = new Date(value);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  };
  const [perameter, setPerameter] = useState("");

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

  const handleDataChange = (data: any) => {
    setChartData(data);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className=" dark:bg-[#121212] rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5"
        sx={
          deviceType === "mobile"
            ? {
                width: "100%",
                maxWidth: "414px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: 0,
                margin: 0,
                "& > *": {
                  maxWidth: "100%",
                  width: "100%",
                  maxHeight: "100%",
                  overflow: "auto",
                  margin: 0,
                  padding: 0,
                },
              }
            : {
                width: "85%",
                display: "flex",
                flexDirection: "column",
                padding: 10,
              }
        }
      >
        {deviceType !== "mobile" && (
          <Typography
            variant="h4"
            sx={{
              p: 2,
              textAlign: "left",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            Parameter Dashboard
          </Typography>
        )}
        <Paper elevation={3} className="bg-gray-800 p-6 mb-6 overflow-auto">
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              maxHeight: "100vh",
              maxWidth: "100%",
              margin: 0,
              padding: 0,
            }}
          >
            <Suspense fallback={<Skeleton />}>
              <ReusableLineChart key={refreshTrigger} data={chartData}   />
            </Suspense>
          </Box>
        </Paper>

        <Paper elevation={3} className="p-6 mb-6 overflow-auto">
          <Box
            sx={
              deviceType === "mobile"
                ? {
                    width: "100%",
                    maxWidth: {
                      xs: "414px",
                      sm: "100%",
                    },
                    height: {
                      xs: "100vh",
                      sm: "100%",
                    },
                    display: "flex",
                    flexDirection: "column",
                    padding: 0, // Remove padding
                    margin: 0, // Remove margin
                    "& > *": {
                      maxWidth: "100%",
                      maxHeight: "100%",
                      overflow: "auto",
                      margin: 0, // Remove child margins
                      padding: 0, // Remove child padding
                    },
                  }
                : {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    boxSizing: "border-box",
                  }
            }
          >
            <Box
              sx={
                deviceType === "mobile"
                  ? {
                      width: "100%",
                      maxWidth: "414px",
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      margin: 0,
                      "& > *": {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        overflow: "auto",
                        margin: 0,
                        padding: 0,
                      },
                    }
                  : {
                      flex: 1,
                      maxWidth: "900px",
                      boxSizing: "border-box",
                      boxShadow: 1,
                      p: 2,
                      borderRadius: 1,
                    }
              }
            >
              <Suspense>
                <PerameterChart
                  onDataChange={handleDataChange}
                  startDate={startDate}
                  endDate={endDate}
                  peramValue={perameter}
                  deviceType={deviceType}
                />
              </Suspense>
            </Box>
            <Box sx={{ ml: 2 }}>
              <Box
                sx={{
                  display: {
                    xs: "none", // hidden on mobile
                    sm: "flex", // flex layout on larger screens
                  },
                  flexDirection: "column",
                  gap: 1,
                  boxShadow: 1,
                  p: 2,
                  borderRadius: 1,
                }}
              >
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
                  <InputLabel id="demo-simple-select-helper-label">
                    Element Selection
                  </InputLabel>
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
                    <MenuItem value={"alk"}>Alkinity</MenuItem>
                    <MenuItem value={"mag"}>Magnesium</MenuItem>
                    <MenuItem value={"ca"}>Calcium</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
