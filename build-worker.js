import fs from 'fs';

function cleanJavascriptFile(content) {
    var output = content;
    output = output.replace(/exports\./gi, 'var '); // Remove exports
    return output;
}

console.log('Loading javascript files...');

var md5 = fs.readFileSync('./dist/index.cjs.js').toString();
var worker = fs.readFileSync('./src/worker.js').toString();

console.log('Clean javascript files...');

var md5_clean = cleanJavascriptFile(md5);

console.log('Creating worker javascript...');

fs.writeFileSync('./dist/md5_worker.js', md5_clean + worker);

fs.writeFileSync('./dist/md5.js', md5);
