const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');
const process = require('process');

// Update metadata
let meta = {
    "index": "Evolution Process"
};
const prefix = '/pages/language/evolution';
const cwd = process.cwd(); // current working directory of the process
const files = fs.readdirSync(cwd + prefix);
for (let f of files) {
    if (f.endsWith('.mdx') && f.startsWith("OTP-")) {
        const name = f.substring(0, f.length - 4);
        const title = matter(fs.readFileSync(path.join(cwd, prefix, f), 'utf8')).data.title;
        meta[name] = title;
    }
}

// Write metadata
fs.writeFileSync(path.join(cwd, `${prefix}/_meta.json`), JSON.stringify(meta, null, 4));