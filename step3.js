const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(filePath, out) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading ${filePath}:\n  ${err}`);
            process.exit(1);
        }
        helperOut(data, out);
    });
}

async function webCat(url, out) {
    try {
        const res = await axios.get(url);
        helperOut(res.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  ${err}`);
        process.exit(1);
    }
}

function helperOut(text, out) {
    if (out) {
        fs.writeFile(out, text, "utf8", function (err) {
            if (err) {
                console.error(`Couldn't write ${out}:\n  ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

let out;
let path;

if (process.argv[2] === "--out") {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
    webCat(path, out);
} else {
    cat(path, out);
}
