import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if(!token?.length || token === 'undefined'){
      throw new Error('[!] Token not found.');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tools/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error('[!] Something went wrong.');
    }

    const responseData = await res.json();

    return NextResponse.json(responseData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
