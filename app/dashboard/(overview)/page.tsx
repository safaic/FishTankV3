'use client';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Box, Container, Paper } from '@mui/material'

const PerameterChart = dynamic(
  () => import('@/app/ui/dashboard/peramchart'),
)

const ReusableLineChart = dynamic(
  () => import('@/app/ui/dashboard/peramgraph'),
)

export default function Page() {
  return (
    <Box className="min-h-screen bg-gray-900 py-8">
      <Container maxWidth="lg">
        <Paper elevation={3} className="bg-gray-800 p-6 mb-6">
          <Suspense fallback={
            <div className="flex justify-center items-center h-40 text-gray-400">
              Loading...
            </div>
          }>
            <PerameterChart />
          </Suspense>
        </Paper>
        <Paper elevation={3} className="bg-gray-800 p-6">
          <ReusableLineChart />
        </Paper>
      </Container>
    </Box>
  )
}