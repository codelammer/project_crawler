const fs = require('fs');
const cheerio = require('cheerio');
const moment = require('moment');
// const app = require('express')();

const parser = async (fileLocation) => {    
    let cases = [];
    let myData;
    try {
        myData = await fs.readFileSync(fileLocation, "utf8");//read html file as string
    } catch (error) {
        console.log('error reading the file');
        return;
    }

    const $ = cheerio.load(myData); //load html file as dom like
    $('.post').each(function () {
        //for every post class ('contains the required data)
        let cheerioTitle = $(this).find('table tr td h2').text().trim(); 
        let cheerioUrl = $(this).find('.show-more.pull-right').attr('href');
        let tempDate = $(this).find('table tr td.date-delivered').html().split('<span class="meta_title">Date Delivered: </span>')[1];
        let cheerioDate = moment(tempDate, 'DD MMM YYYY').format("YYYY-MM-DD"); //parse date with moment to YYYYMMDD        
        cases.push({ title: cheerioTitle, url: cheerioUrl, date: cheerioDate });
    });

    console.log(cases);
    
}

// parser("ref_files/1.html");
module.exports = parser;
