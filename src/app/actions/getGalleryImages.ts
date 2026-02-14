'use server';

import fs from 'fs';
import path from 'path';

export interface GalleryImage {
    src: string;
    filename: string;
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
    const publicDir = path.join(process.cwd(), 'public');
    const galleryDir = path.join(publicDir, 'gallery');

    try {
        if (!fs.existsSync(galleryDir)) {
            return [];
        }

        const files = fs.readdirSync(galleryDir);

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

        const images = files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return imageExtensions.includes(ext);
            })
            .map(file => ({
                src: `/gallery/${file}`,
                filename: file
            }));

        return images;
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        return [];
    }
}
