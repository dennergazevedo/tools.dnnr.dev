import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const { token, ...requestBody }: TodoCreate = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tools/todos?todo_id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error('[!] Something went wrong.');
    }

    return NextResponse.json({ status: "OK" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
