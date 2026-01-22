'use strict';

const fs = require('fs');

const vin=["A1111111111111111","B2222222222222222", "C3333333333333333", 'D4444444444444444',
            "E5555555555555555", "F6666666666666666", "G7777777777777777","H8888888888888888",
            "I9999999999999999", "J1010101010101010", "K1111111111111111","L1212121212121212"];

const userID=["abcd@abcd.com","efgh@efgh.com", "ijkl@ijkl.com", "mnop@mnop.com", "qrst@qrst.com"];

const scannerID=["00:11:27:27:33:11", "00:22:27:27:33:22", "00:33:27:27:33:33", "00:44:27:27:33:44", 
                "00:11:27:27:33:22", "00:22:27:27:33:33", "00:33:27:27:33:44", "00:44:27:27:33:55",
                "00:11:27:27:33:66", "00:22:27:27:33:77", "00:33:27:27:33:88", "00:44:27:27:33:99"];
const makemodel =["Toyota", "Camry", "Nissan","Murano","Ford","Escape", "BMW", "X3", 
            "Buick","Enclave",  "Toyota", "RAV4", "Nissan", "Rogue", "Ford","Focus",
            "BMW",	"X5", "GMC","Yukon", "Hyundai", "Ionic",  "volkswagen", "Atlas"];
const trim=["A","B", "G","X", "E", "A","B", "G","X", "E",  "A","B"  ];

const availableParamSet= ["S1_PID_05_EngineCoolantTemp",
                        "S1_PID_0C_EngineRPM",
                        "S1_PID_0D_VehicleSpeed",
                        "S1_PID_0F_IntakeAirTemperature",
                        "S1_PID_10_MAFAirFlowRate",
                        "S1_PID_1F_TimeSinceEngStart",
                        "S1_PID_33_AbsBaroPres",
                        "S1_PID_46_AmbientAirTemp",
                        "S1_PID_5B_HybrBatPackRemLife",
                        "S1_PID_2F_FuelTankLevel" ];
const logActive=[true, false, false, true,true, false, false, true,true, false, false, true];
const logParamSet=[
    {"serviceID": "S1",
        "parameterID": "05",
        "shortName": "EngineCoolantTemp",
        "name": "S1_PID_05_EngineCoolantTemp",
        "requestCode": "0201055555555555",
        "description": "Engine coolant temperature",
        "unit": "degC",
        "min": -40,
        "max": 215
    },
    {
        "serviceID": "S1",
        "parameterID": "0C",
        "shortName": "EngineRPM",
        "name": "S1_PID_0C_EngineRPM",
        "requestCode": "02010C5555555555",
        "description": "Engine speed",
        "unit": "rpm",
        "min": 0,
        "max": 16384
    },
    {
        "serviceID": "S1",
        "parameterID": "0D",
        "shortName": "VehicleSpeed",
        "name": "S1_PID_0D_VehicleSpeed",
        "requestCode": "02010D5555555555",
        "description": "Vehicle speed",
        "unit": "km/h",
        "min": 0,
        "max": 255
    },
    {
        "serviceID": "S1",
        "parameterID": "0F",
        "shortName": "IntakeAirTemperature",
        "name": "S1_PID_0F_IntakeAirTemperature",
        "requestCode": "02010F5555555555",
        "description": "Intake air temperature",
        "unit": "degC",
        "min": -40,
        "max": 215
    },
    {
        "serviceID": "S1",
        "parameterID": "10",
        "shortName": "MAFAirFlowRate",
        "name": "S1_PID_10_MAFAirFlowRate",
        "requestCode": "0201105555555555",
        "description": "Mass air flow sensor air flow rate",
        "unit": "grams/sec",
        "min": 0,
        "max": 655    
    },
    {
        "serviceID": "S1",
        "parameterID": "1F",
        "shortName": "TimeSinceEngStart",
        "name": "S1_PID_1F_TimeSinceEngStart",
        "requestCode": "02011F5555555555",
        "description": "Run time since engine start",
        "unit": "seconds",
        "min": 0,
        "max": 65535
    }
];
let c=0;
let num=12;
//const rawdata=fs.readFileSync('test_data_obd2.json');
//const jsdata=JSON.parse(rawdata);
const vehicle_list=[];
for (let i = 0; i < num; i++) {
    const obj= {
        vehicleInfo: {
            vin:vin[i],
            make: makemodel[2*i],
            model: makemodel[2*i+1],
            trim: trim[i],
            year: 2018+ Math.floor(Math.random() * 6), 
            featureSet: [],
            scannerID: scannerID[i],
            availableParamSet: availableParamSet,
        },
        user: {
            userID: userID[i%5],
            userKey: "pw12345",
        },
        logInfo:{
            logParamSet: logParamSet,
            logActive: logActive[i],
            logInterval: 5,
            uploadInterval: 10
        }
    }
    vehicle_list[i]=obj;

  }

const wdata = JSON.stringify(vehicle_list, null, 2); //add new line and indentation
fs.writeFile('vehicle_list12-2.json', wdata, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
