const fs = require('fs');
const axios = require('axios').default;
const parser = require('./parser.js');

//form data
let form = {
    date_from : "01 Dec 2020",
    date_to : "15 Dec 2020"
}

const writeFile = async (fileName, data) => {
    try {
       fs.writeFileSync(fileName, data);          
    } catch (error) {
        console.log(`error writing the file`);
    }
}

//get data from the server
const getData = async (urlString) => {
    const response = await axios({
        method: 'post',
        url: urlString,
        data: form,        
        headers: {
            'Content-Type': `multipart/form-data`,
        },
    });

    return response;
}

//save request to file - function Declaration
const saveRequest = async (url, fileName) => {
    let resData;
    try {
        resData = await getData(url);        
    } catch (error) {
        console.log(`error`);
        console.log(error);
    }
    
    //save to file

    try {
        // check if dir does not exist
        if (!fs.existsSync('ref_files')) {
            fs.mkdir('ref_files', (err) => {
            if (err) {
                console.error(`error creating dir: ${err}`);
            }
            });
        }
        await writeFile(`ref_files/${fileName}.html`, resData.data);
    } catch (error) {
        console.error(`error writing to file`);
        console.error(error);
    }
}

//call multiple requests and save to file
const saveRequests = async () => {
    await saveRequest('http://kenyalaw.org/caselaw/cases/advanced_search/',"1");
    await saveRequest('http://kenyalaw.org/caselaw/cases/advanced_search/10' ,"2");
}

// main func
(async () => {       
    await saveRequests();
    await parser("ref_files/1.html");
    await parser("ref_files/2.html");    
})();