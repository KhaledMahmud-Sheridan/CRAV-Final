'use strict';

const fs = require('fs');
const series=[];
const vin=["ABCD1111111111111","EFGH2222222222222", "IJKL3333333333333", 'MNOP4444444444444'];
const email=["abcd@abcd.com","efgh@efgh.com", "ijkl@ijkl.com", "mnop@mnop.com"];
const scannerID=["00:11:27:27:33:11", "00:22:27:27:33:22", "00:33:27:27:33:33", "00:44:27:27:33:44"];

let c=0;
const rawdata=fs.readFileSync('test_data_obd2.json');
const jsdata=JSON.parse(rawdata);
for (let i in jsdata){
    //series[i]=jsdata[i];
    const obj= {
        timestamp: jsdata[i].timestamp,
        vin: vin[c],
        email: email[c],
        scannerID: scannerID[c],
        parameterSet: jsdata[i].parameterSet
    }
    series[i]=obj;
    c=(c+1)%4;
}
const wdata = JSON.stringify(series, null, 2); //add new line and indentation
fs.writeFile('test_data_obd2_updated2.json', wdata, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
