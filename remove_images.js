const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/data/portfolio.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the projects array
const projectsStart = content.indexOf('projects: [');
if (projectsStart === -1) {
    console.error('Could not find projects array');
    process.exit(1);
}

// Find the end of projects array
// We count brackets to find the matching closing bracket for projects: [
let depth = 0;
let projectsEnd = -1;
let foundStart = false;

for (let i = projectsStart; i < content.length; i++) {
    if (content[i] === '[') {
        if (!foundStart) foundStart = true;
        depth++;
    } else if (content[i] === ']') {
        depth--;
        if (depth === 0 && foundStart) {
            projectsEnd = i;
            break;
        }
    }
}

if (projectsEnd === -1) {
    console.error('Could not find end of projects array');
    process.exit(1);
}

const beforeProjects = content.substring(0, projectsStart);
let projectsContent = content.substring(projectsStart, projectsEnd + 1);
const afterProjects = content.substring(projectsEnd + 1);

// Remove image properties in projectsContent
// Regex to match "image: '...',"
projectsContent = projectsContent.replace(/image:\s*['"][^'"]*['"],/g, '');

// Remove galleryImages properties in projectsContent
// Regex to match "galleryImages: [ ... ]" dealing with newlines
// We use [\s\S]*? for non-greedy multiline match
projectsContent = projectsContent.replace(/galleryImages:\s*\[[\s\S]*?\],?/g, '');

// Clean up extra blank lines created
projectsContent = projectsContent.replace(/^\s*[\r\n]/gm, '');

const newContent = beforeProjects + projectsContent + afterProjects;

fs.writeFileSync(filePath, newContent);
console.log('Successfully updated portfolio.ts');
