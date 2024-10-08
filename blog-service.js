const fs = require("fs");
const path = require('path');
const categories = JSON.parse(path.join(__dirname, '/data/categories.json'));
const posts = JSON.parse(path.join(__dirname, '/data/categories.json'));

fs.readFile('categories.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    });

function outputA() {
    return new Promise((resolve, reject) => {
        // place our code inside a "Promise" function
        console.log('A');
        resolve(); // call "resolve" because we have completed the function successfully
        reject();
    });
}