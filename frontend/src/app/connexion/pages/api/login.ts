import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
        const { email, password } = await request.json();
        const res = await fetch(`${process.env.API_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const { token } = await res.json();
            return NextResponse.json({ token });
        } else {
            const error = await res.json();
            return NextResponse.json({ error: error.message }, { status: res.status });
        }
    
}