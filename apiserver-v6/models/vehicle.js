const conf =require('../config');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the Schema and model
const aSchema = new Schema({
    vehicleInfo: {
      vin:{type:String, required: [true, 'vin field is required']},
      make: {type: String, required: [true, 'make field is required']},
      model: {type: String, required: [true, 'model field is required']},
      trim: String,
      year: {type: Number, required: [true, 'year field is required']},
      featureSet: [String],
      scannerID: String,
      availableParamSet: [String] //Available in the vehicle OBD2, parameter names, string
    },
    user: {
      userID: {type: String, required: [true, 'userID is required']},  //user ID
      userKey: {type: String, required: [true, 'userKey is required']},  //may be hashed passphrase
    },
    logInfo: {
      logParamSet: [Object],
      logActive:{type: Boolean, default: false},
      logInterval: {type: Number, default: 300},  //default scan every 300 sec (5 min)
      uploadInterval: {type: Number, default: 600} //default upload every 600 sec (10 mins) 
    }
});

const collectionName= conf.vehicleCollection;  //"vehicle";
const dataendpoint=conf.endpointVehicle;
// Virtual for vehicle's URL
aSchema.virtual("url").get(function () {
    return `/${conf.endpointcrav}/${dataendpoint}/id/${this._id}`;
  });

// Export model
module.exports = mongoose.model(collectionName, aSchema);