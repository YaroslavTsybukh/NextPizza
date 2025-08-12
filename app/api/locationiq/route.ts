import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const query = url.searchParams.toString();

    const apiKey = process.env.ACCESS_TOKEN_LOCATION_IQ;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const locationIqUrl = `${process.env.API_URL_LOCATION_IQ_AUTOCOMPLETE}?key=${apiKey}&${query}`;

    try {
        const res = await fetch(locationIqUrl);

        if (!res.ok) {
            return NextResponse.json({ error: 'LocationIQ request failed' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Fetch error' }, { status: 500 });
    }
}
