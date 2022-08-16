var fs = require('fs');

function cleanJavascriptFile(content) {
    var output = content;
    output = output.replace(/^.*export.*$/mi, ''); // Remove exports
    output = output.replace(/^.*export.*$/mi, ''); // Remove exports
    output = output.replace(/^.*export.*$/mi, ''); // Remove exports
    output = output.replace(/^.*require.*$/mi, ''); // Remove reqires
    output = output.replace(/md5_1\./g, ''); // Fix reference to Md5 class
    output = output.replace(/\n\n/g, '\n'); // Reduce new lines
    return output;
}

console.log("Loading javascript files...");

var file_hasher = fs.readFileSync('./dist/cjs/md5_file_hasher.js').toString();
var md5 = fs.readFileSync('./dist/cjs/md5.js').toString();
var worker = fs.readFileSync('./src/worker.js').toString();

console.log("Clean javascript files...");

file_hasher = cleanJavascriptFile(file_hasher);
var md5_clean = cleanJavascriptFile(md5);

console.log("Creating worker javascript...");

fs.writeFileSync('./dist/md5_worker.js', file_hasher + md5_clean + worker);

fs.writeFileSync('./dist/md5.js', md5);
