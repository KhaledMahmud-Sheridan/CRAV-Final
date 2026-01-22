'use strict';

const fs = require('fs');
const series=[];
//const vin=["ABCD1111111111111","EFGH2222222222222", "IJKL3333333333333", 'MNOP4444444444444'];
//const email=["abcd@abcd.com","efgh@efgh.com", "ijkl@ijkl.com", "mnop@mnop.com"];
//const scannerID=["00:11:27:27:33:11", "00:22:27:27:33:22", "00:33:27:27:33:33", "00:44:27:27:33:44"];
const miscSet={
    gpsData: {
        timestamp: "2023-04-10T12:00:00.000Z",
        lat:"43.469440361380144",
        long: "-79.69926708994022",
        elev: "1"
    },
    otherData:{
        item1: "Item1 value",
        item2: "Item2 value"
    }
};

let c=0;
const rawdata=fs.readFileSync('obd2_tseries-v1.json');
const jsdata=JSON.parse(rawdata);
for (let i in jsdata){
    const obj= jsdata[i]; 
    obj.miscSet= miscSet;
    series[i]=obj;
    //console.log(miscSet);
    //console.log(obj.miscSet);
    
    //console.log(i);
    //console.log(series);
}
const wdata = JSON.stringify(series, null, 2); //add new line and indentation
fs.writeFile('obd2_tseries-v2.json', wdata, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
