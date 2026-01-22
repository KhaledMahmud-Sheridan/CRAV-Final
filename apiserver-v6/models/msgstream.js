const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create MsgStream Schema and model
const aSchema = new Schema({
    timeStamp: {type: String, required: [true, 'timeStamp field is required']},
    vin: {type: String, required: [true, 'vin field is required']},
    scannerID: {type: String, required: [true, 'scannerID field is required']},
    messageID: {type: String, required: [true, 'messageID field is required']},
    dataLength: {type: Number, required: [true, 'dataLength field is required']},
    dataBytes: String
});

const collectionName=conf.msgstreamCollection;//"msgstream";
const dataendpoint=conf.endpointMsgstream;
// Virtual for msgstream's URL
aSchema.virtual("url").get(function () {
    return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
  });

// Export model
module.exports = mongoose.model(collectionName, aSchema);