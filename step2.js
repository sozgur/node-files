const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(filePath) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading ${filePath}:\n  ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

const path = process.argv[2];

if (path.slice(0, 4) === "http") {
    webCat(path);
} else {
    cat(path);
}
