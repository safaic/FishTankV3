

'use client';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

const PerameterChart = dynamic(
  () => import('@/app/ui/dashboard/peramchart'),

)

const ReusableLineChart = dynamic(
  () => import('@/app/ui/dashboard/peramgraph'),

)


export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PerameterChart />
      </Suspense>
      <ReusableLineChart />
    </div>
  )
}