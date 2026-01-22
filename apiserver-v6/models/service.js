const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define the Schema
const aSchema = new Schema({
    serviceID:      {type: String, required: [true, 'serviceID field is required'] },
    serviceName:    {type: String, required: [true, 'serviceName field is required'] },
    description:    String
});

const collectionName=conf.serviceCollection; //"service";
const dataendpoint=conf.endpointService;
// Virtual for URL; get a service by ID
aSchema.virtual("url").get(function () {
  return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
});

// Create model, Export model
module.exports = mongoose.model(collectionName, aSchema);
