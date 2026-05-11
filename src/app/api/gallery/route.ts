import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  try {
    const files = fs.readdirSync(galleryDir);
    const images = files.filter(file => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file));
    
    const imageList = images.map(file => ({
      src: `/gallery/${file}`,
      alt: file.replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim(),
      gradient: getRandomGradient()
    }));

    return NextResponse.json(imageList);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read gallery' }, { status: 500 });
  }
}

function getRandomGradient() {
  const gradients = [
    { from: '#668CFF', via: '#0049FF', to: '#003199' },
    { from: '#FFE766', via: '#FFCE00', to: '#B38F00' },
    { from: '#6690F0', via: '#255BE3', to: '#193B99' },
    { from: '#C4C2FF', via: '#9896FF', to: '#5B4DCC' },
    { from: '#FF66A1', via: '#FF007A', to: '#B3005A' },
    { from: '#D9FF5A', via: '#AFFF01', to: '#7A9900' },
    { from: '#8AA7FF', via: '#5F86FF', to: '#3A5ACC' },
    { from: '#67F0D1', via: '#2AE5B9', to: '#1B8F72' },
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}
