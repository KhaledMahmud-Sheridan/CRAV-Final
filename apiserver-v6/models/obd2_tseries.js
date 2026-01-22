const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create OBD2_TSSchema Schema and model
const aSchema = new Schema({
    timestamp: {type: Date, required: [true, 'timeStamp field is required']},
    vin:{type:String, required: [true, 'vin field is required']},
    scannerID: {type: String, required: [true, 'scannerID field is required']},
    parameterSet: {
        type: Object, //type: object: example {pID: parameterID, sID: serviceID}
    },
    miscSet: {
        type: Object,   //Other logged data, e.g., GPS, 
    }
});

const collectionName=conf.OBD2_tseriesCollection;//"OBD2_tseries";
const dataendpoint=conf.endpointOBD2TS;
// Virtual for OBD2_ts's URL
aSchema.virtual("url").get(function () {
    return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
  });

// Export model
module.exports = mongoose.model(collectionName, aSchema);