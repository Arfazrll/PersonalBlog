const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve); // close() is async, call cb after close completes.
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { }); // Delete the file async. (But we don't check the result)
            reject(err);
        });
    });
}

async function run() {
    try {
        const dir = path.join(__dirname, '..', '..', 'public', 'lanyard');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        console.log('Downloading card.glb...');
        await downloadFile('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', path.join(dir, 'card.glb'));
        console.log('Downloading lanyard.png...');
        await downloadFile('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', path.join(dir, 'lanyard.png'));
        console.log('Download complete.');
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
