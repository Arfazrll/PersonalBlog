import fs from 'fs';
import path from 'path';

async function download(url, filePath) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Saved ${filePath}`);
}

async function run() {
    const pubDir = path.join(process.cwd(), 'public', 'lanyard');
    if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });

    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', path.join(pubDir, 'card.glb'));
    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', path.join(pubDir, 'lanyard.png'));
}

run().catch(console.error);
