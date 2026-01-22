const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create parameter Schema and model
const aSchema = new Schema({
    serviceID: {type: String, default: "S1"},
    parameterID:  String,
    name: {type: String, required: [true, 'parameter name field is required']},
    shortName: String,
    requestCode: String,
    unit: String,
    min: Number,
    max: Number,
    description: String
});

const collectionName=conf.parameterCollection;//"parameter";
const dataendpoint=conf.endpointParameter;
// Virtual for parameter's URL
aSchema.virtual("url").get(function () {
    return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
  });

// Export model
module.exports = mongoose.model(collectionName, aSchema);