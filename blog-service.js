const fs = require("fs");

fs.readFile('somefile.json', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    });