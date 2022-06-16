const fs = require('fs');
const axios = require('axios').default;

const writeFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) {              
            console.log(err);
        }
        console.log('file saved successfully');
    });  
}

// axios.get('http://kenyalaw.org/caselaw/cases/advanced_search/')
// // axios.get('https://codelammer.vercel.app')
//     .then(function (response) {
//         // console.log('response.data');
//         // console.log(response.data);
//         // console.log('response.data');
//         try {
//             // check if dir does not exist
//             if (!fs.existsSync('ref_files')) {
//               fs.mkdir('ref_files', (err) => {
//                 if (err) {
//                     console.error(`error creating dir: ${err}`);
//                 }
//               });
//             }

//             writeFile('ref_files/1.html', response.data);

//         } catch (error) {
//             console.error(error);
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//     });


