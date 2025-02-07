import { fetchPerameter, createPerameter, updatePerameter, deletePerameter } from '@/app/lib/data';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const data = await fetchPerameter();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await createPerameter(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = await updatePerameter(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update record' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deletePerameter(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}