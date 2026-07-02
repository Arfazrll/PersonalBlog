const fs = require('fs');
const path = require('path');

function findFillWithoutSizes(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(findFillWithoutSizes(filePath));
        } else if (file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const imageTags = content.match(/<Image[^>]+>/g);
            if (imageTags) {
                for (const tag of imageTags) {
                    if (tag.includes('fill') && !tag.includes('sizes') && !tag.includes('unoptimized')) {
                        results.push({ file: filePath, tag: tag });
                    }
                }
            }
        }
    }
    return results;
}

const res = findFillWithoutSizes(path.join(process.cwd(), 'src'));
console.log(JSON.stringify(res, null, 2));
