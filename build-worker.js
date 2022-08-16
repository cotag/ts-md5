var fs = require('fs');

function cleanJavascriptFile(content) {
    content = content.replace(/^.*export.*$/mi, ''); // Remove exports
    content = content.replace(/^.*export.*$/mi, ''); // Remove exports
    content = content.replace(/^.*export.*$/mi, ''); // Remove exports
    content = content.replace(/^.*require.*$/mi, ''); // Remove reqires
    content = content.replace(/md5_1\./g, ''); // Fix reference to Md5 class
    content = content.replace(/\n\n/g, '\n'); // Reduce new lines
    return content;
}

console.log("Loading javascript files...");

var file_hasher = fs.readFileSync('./dist/cjs/md5_file_hasher.js').toString();
var md5 = fs.readFileSync('./dist/cjs/md5.js').toString();
var worker = fs.readFileSync('./src/worker.js').toString();

console.log("Clean javascript files...");

file_hasher = cleanJavascriptFile(file_hasher);
md5 = cleanJavascriptFile(md5);

console.log("Creating worker javascript...");

fs.writeFileSync('./dist/md5_worker.js', file_hasher + md5 + worker);
