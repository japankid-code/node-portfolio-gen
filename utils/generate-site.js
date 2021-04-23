const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, (err) => {
            // if there's an error, reject promise
            if (err) {
                reject (err);
                return;
            }
            resolve({
                ok: true,
                message: 'file created :)'
            });
        })
    })
}

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject (err);
                return;
            }
            resolve({
                ok: true,
                message: 'file copied! :D'
            })
        })
    })
}

module.exports = { writeFile, copyFile }