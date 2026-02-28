import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), 'public', 'lanyard');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        const assets = [
            { url: 'https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', name: 'card.glb' },
            { url: 'https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', name: 'lanyard.png' }
        ];

        let results = [];
        for (const asset of assets) {
            const res = await fetch(asset.url);
            if (!res.ok) throw new Error(`Failed to fetch ${asset.url}`);
            const buffer = await res.arrayBuffer();
            fs.writeFileSync(path.join(publicDir, asset.name), Buffer.from(buffer));
            results.push(`Saved ${asset.name} (${buffer.byteLength} bytes)`);
        }

        return NextResponse.json({ success: true, results });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
