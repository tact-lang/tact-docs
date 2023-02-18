const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

// Update metadata
let meta = {
    "index": "Evolution Process"
};
const files = fs.readdirSync(__dirname + '/pages/evolution');
for (let f of files) {
    if (f.endsWith('.mdx') && f.startsWith("OTP-")) {
        let name = f.substring(0, f.length - 4);
        let title = matter(fs.readFileSync(path.join(__dirname, '/pages/evolution', f), 'utf8')).data.title;
        meta[name] = title;
    }
}

// Write metadata
fs.writeFileSync(path.join(__dirname, '/pages/evolution/_meta.json'), JSON.stringify(meta, null, 4));