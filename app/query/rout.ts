// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function listPeramRecords() {
// 	const data = await sql`
//       SELECT id,test_date as date, category as peram, value as level FROM PerameterData
//       `;

// 	return data;
// }

// export async function GET() {
//   try {
//   	return Response.json(await listPeramRecords());
//   } catch (error) {
//   	return Response.json({ error }, { status: 500 });
//   }
// }


import { fetchPerameter } from '@/app/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await fetchPerameter();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}