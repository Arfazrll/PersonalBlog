'use server';

import fs from 'fs';
import path from 'path';

export async function getProjectImages(slug: string, title?: string): Promise<string[]> {
    const publicDir = path.join(process.cwd(), 'public');
    const projectDir = path.join(publicDir, 'project'); // Folder: public/project
    const validImages: string[] = [];

    // Strategy 1: Slug-based (terraflow-platform -> terraflowplatform)
    const sanitizedSlug = slug.replace(/-/g, '');

    // Strategy 2: Title-based (SNBTIn - Platform... -> snbtinplatformpersiapansnbt2025)
    // Remove all non-alphanumeric characters and lowercase
    const sanitizedTitle = title ? title.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    // We will check both strategies. If title matches user preference, it will be found.
    // We prioritize Title if it exists, as per user request for SNBTIn.
    const searchBases = sanitizedTitle ? [sanitizedTitle, sanitizedSlug] : [sanitizedSlug];

    // Remove duplicates if title and slug normalize to the same string
    const uniqueBases = [...new Set(searchBases)];

    for (const baseName of uniqueBases) {
        if (!baseName) continue;

        // Check for images 1 to 10
        for (let i = 1; i <= 10; i++) {
            const extensions = ['png', 'jpg', 'jpeg', 'webp'];

            for (const ext of extensions) {
                const filename = `${baseName}${i}.${ext}`;
                const filePath = path.join(projectDir, filename);

                try {
                    if (fs.existsSync(filePath)) {
                        // Avoid duplicates if we check multiple bases
                        const imagePath = `/project/${filename}`;
                        if (!validImages.includes(imagePath)) {
                            validImages.push(imagePath);
                        }
                        break; // Stop checking extensions for this number
                    }
                } catch (error) {
                    // Ignore errors
                }
            }
        }

        // If we found images with this base, we might stop? 
        // Or should we merge? validImages will collect from both if they exist.
        // Assuming user uses ONE convention per project. 
        // If we found images, we can break the base loop to avoid mixing if they have both (unlikely).
        if (validImages.length > 0) break;
    }

    return validImages;
}
