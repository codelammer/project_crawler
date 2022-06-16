const fs = require('fs');
const cheerio = require('cheerio');

const parser = () => {    

    fs.readFile("ref_files/1.html", "utf8", (err, data) => {      
        if (err) {
            console.log(`error reading the file`);
            console.log(err);
        }  
        console.log("Here's your data");
        const $ = cheerio.load(data);
        $('h2').each(function () {
            console.log($(this));
        });
    });
}

parser();

// module.exports = parser;