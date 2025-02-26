import { NextRequest, NextResponse  } from 'next/server';


export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

export async function POST(request: NextRequest) {
    const { email, password, firstName, lastName, statut} = await request.json();
    console.log("New user registration:", { email, password, firstName, lastName, statut });
    const res = await fetch(`${process.env.API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization', 
            
        },
        body: JSON.stringify({ email, password, firstName, lastName, statut }),
    });
    if (res.ok) {
        return NextResponse.json({ message: 'Inscription réussie' });

    } else {
        const error = await res.json();
        return NextResponse.json({ error: error.message }, { status: res.status });
    }
}

