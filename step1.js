const fs = require("fs");
const process = require("process");

function cat(filePath) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading ${filePath}:\n  ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

cat(process.argv[2]);
