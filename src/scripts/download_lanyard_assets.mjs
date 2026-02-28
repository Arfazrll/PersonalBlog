import fs from 'fs';
import path from 'path';
import https from 'https';

const baseUrl = 'https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/';
const files = ['card.glb', 'lanyard.png'];
const targetDir = path.join(process.cwd(), 'public', 'lanyard');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

files.forEach(file => {
    const targetPath = path.join(targetDir, file);
    const fileUrl = baseUrl + file;

    https.get(fileUrl, (res) => {
        if (res.statusCode === 200) {
            const fileStream = fs.createWriteStream(targetPath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Successfully downloaded ${file}`);
            });
        } else {
            console.error(`Failed to download ${file}: ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error(`Error downloading ${file}: ${err.message}`);
    });
});
