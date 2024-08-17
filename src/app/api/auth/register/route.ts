import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error('[!] Não foi possível criar o usuário');
    }

    const responseData = await res.json();

    return NextResponse.json({ data: responseData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
