const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Service Schema and model
const aSchema = new Schema({
    messageID: {type: String, required: [true, 'messageID field is required'] },
    messageName: {type: String, required: [true, 'messageName field is required'] },
    description: String
});

const collectionName=conf.messageCollection;//"messsage";
const dataendpoint=conf.endpointMessage;

// Virtual for message's URL
aSchema.virtual("url").get(function () {
    return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
  });
// Export model
module.exports = mongoose.model(collectionName, aSchema);