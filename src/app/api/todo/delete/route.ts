import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    if (!token || !id) {
      throw new Error('[!] Something went wrong.');
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tools/todos?todo_id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('[!] Something went wrong.');
    }

    return NextResponse.json({ status: "OK" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
