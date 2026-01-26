import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch from WakaTime' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
