const fs = require('fs');
const text = fs.readFileSync('components/three/pretext-background.tsx', 'utf8');
const idx = text.indexOf('"use client";', 10);
if (idx !== -1) {
    fs.writeFileSync('components/three/pretext-background.tsx', text.slice(0, idx));
    console.log('Fixed duplicated file content.');
} else {
    console.log('Duplicate not found.');
}
