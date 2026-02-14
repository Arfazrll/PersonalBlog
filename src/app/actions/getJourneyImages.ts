'use server';

import fs from 'fs';
import path from 'path';

export async function getJourneyImages(slug: string): Promise<string[]> {
    const publicDir = path.join(process.cwd(), 'public');
    const journeyDir = path.join(publicDir, 'journey');
    const validImages: string[] = [];

    for (let i = 1; i <= 4; i++) {
        const filename = `${slug}${i}.jpg`;
        const filePath = path.join(journeyDir, filename);

        try {
            if (fs.existsSync(filePath)) {
                validImages.push(`/journey/${filename}`);
            }
        } catch (error) {
        }
    }

    return validImages;
}
