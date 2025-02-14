"use server";
import {
  fetchParameter,
  createParameter,
  updateParameter,
  deleteParameter,
} from "@/app/lib/data";
import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/subabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) {
      throw new Error("No authenticated user");
    }
    const data3 = await fetchParameter(data.user.id);
    return NextResponse.json(data3);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) {
      throw new Error("No authenticated user");
    }
    const body = await request.json();
    const data3 = await createParameter(body, data.user.id);
    return NextResponse.json(data3);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) {
      throw new Error("No authenticated user");
    }

    const userId = data.user.id;
    const body = await request.json();
    const responseData = await updateParameter(body, userId);
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.id) {
      throw new Error("No authenticated user");
    }
    const userId = data.user.id;
    const { id } = await request.json();
    await deleteParameter(id, userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 },
    );
  }
}
