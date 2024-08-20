import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  try {
    const {token, ...requestBody}: TodoCreate = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tools/todos`, {
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

    const { id, description, completed }: TodoCreateResponse = await res.json();

    return NextResponse.json({ data: {
      id,
      description,
      completed,
    } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
