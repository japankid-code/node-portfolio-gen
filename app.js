const fs = require('fs');
const generatePage = require('./src/page-template.js');

const pageHTML = generatePage(name, github);

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('file written to index.html')
})