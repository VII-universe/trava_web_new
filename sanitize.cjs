const fs = require('fs');
const path = require('path');

function sanitizeName(name) {
    if (name === '.DS_Store') return name;
    let ext = path.extname(name);
    let base = path.basename(name, ext);
    
    base = base.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // remove diacritics
    base = base.replace(/[^a-zA-Z0-9\-_]/g, "_"); // replace spaces and special chars with underscore
    base = base.toLowerCase();
    
    return base + ext.toLowerCase();
}

let replacements = [];

function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        if (item === '.DS_Store') continue;
        
        const oldPath = path.join(dir, item);
        const stat = fs.statSync(oldPath);
        
        // If directory, process children first
        if (stat.isDirectory()) {
            processDirectory(oldPath);
        }
        
        const newName = sanitizeName(item);
        const newPath = path.join(dir, newName);
        
        if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            
            // Record relative change
            // Replace backslashes with slashes for simple string replace
            const relOld = oldPath.split('src/')[1].replace(/\\/g, '/');
            const relNew = newPath.split('src/')[1].replace(/\\/g, '/');
            replacements.push({ old: relOld, new: relNew });
        }
    }
}

const assetsDir = path.join(__dirname, 'src', 'assets', 'zmensene');
processDirectory(assetsDir);

// Sort replacements by descending length so we replace longer paths first
replacements.sort((a, b) => b.old.length - a.old.length);

console.log('Renamed files: ', replacements.length);

const componentsDir = path.join(__dirname, 'src', 'components');
const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));

for (const file of componentFiles) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (const rep of replacements) {
        // Find both NFC and NFD versions of the old path in the text
        const oldNFC = rep.old.normalize('NFC');
        const oldNFD = rep.old.normalize('NFD');
        
        if (content.includes(oldNFC)) {
            content = content.split(oldNFC).join(rep.new);
            changed = true;
        }
        if (content.includes(oldNFD)) {
            content = content.split(oldNFD).join(rep.new);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}

console.log('Sanitization complete.');
