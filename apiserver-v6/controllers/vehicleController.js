const conf =require('../config');
const Vehicle = require("../models/vehicle");
const OBD2param=require("../models/obd2param");

const { body, validationResult } = require("express-validator");
const async = require("async");

// Send list of all vehicles.
//Include max num of documents 
//For GET /list/:num
exports.vehicle_list = function (req, res, next) {
  let listMax=conf.listMax;
  if(req.params.num!=undefined) {listMax=req.params.num;}

  //console.log(listMax);
  Vehicle.find().limit(listMax)
  .then((results)=>{res.send({ data: results});})
  .catch((err)=>{return next(err);});
};

// Send detail page for a specific vehicle, By id
//For GET /id/:id
exports.vehicle_id = (req, res, next) => {
    Vehicle.findById(req.params.id)
      .then((results)=>{
        if (results == null) {
          // No results.
          const err = new Error("vehicle not found");
          err.status = 404;
          return next(err);
        }
        res.send({ data: results });
      })
      .catch((err)=>{return next(err);});
  };

// Send detail page for a specific vehicle, By vin
///For GET /vin/:vin
exports.vehicle_vin = (req, res, next) => {
  //console.log(req.params.vin);
  Vehicle.findOne({"vehicleInfo.vin": req.params.vin})
    .then((results)=>{
      //console.log(results);
      if (results == null) {
        // No results.
        const err = new Error("vehicle not found");
        err.status = 404;
        return next(err);
      }
      res.send({data: results });
    })
    .catch((err)=>{return next(err);});
};

//By vin
//For GET /loginfo/:vin 
exports.vehicle_loginfo_get = (req, res, next) => {
  console.log(req.params.vin);
  Vehicle.findOne({"vehicleInfo.vin": req.params.vin})
    .then((results)=>{
      if (results == null) {
        // No results.
        const err = new Error("Vehicle not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so send the parameters.
      res.send({logParamSet: results.logInfo.logParamSet, logActive: results.logInfo.logActive,});
    })
    .catch((err)=>{return next(err);});
};

// Handle vehicle create on POST.
//For POST /create
exports.vehicle_create_post = [
  // Validate and sanitize fields.
  body("vehicleInfo.vin", "vin must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.make", "make must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.model", "model must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.year", "Year must be specified"),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. 
      res.send({errors: errors.array()});
    }
    // Data from form is valid.
    //Check if vehicle exits with the same vin
    //Code here
    const data=req.body;// JSON data, as vehicle object received in body;  
    data.logInfo.logParamSet=[]; //Make sure the array is empty; these arrays will be updated by the route '/availparams/:vin' 
    data.logInfo.logActive=false; 
    const vehicle = new Vehicle(data);
    vehicle.save()
    .then(()=>{
      //console.log("3. Returned from save ");
      res.send({data:vehicle}); //send back newly created vehicle object
    })
    .catch((err)=>{
      req.send({error:"Error", msg:err});
    });
  },
];

//Update vehicle by id
//For POST /update
exports.vehicle_update = [
  // Validate and sanitize fields.
  body("_id", "id must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.vin", "vin must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.make", "make must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.model", "model must be specified").trim().isLength({ min: 1 }).escape(),
  body("vehicleInfo.year", "Year must be specified"),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send({vehicle, errors: errors.array()});
    }
    //Check if vehicle exits with the same vin
    // code here
    const data=req.body;// JSON data received in body 

    const vehicle = new Vehicle( data);
    //vehicle._id=data.id; //._id should be already in data from the requester
    Vehicle.findByIdAndUpdate(data._id, vehicle, {})
      .then((theVehicle)=>{res.send({data:theVehicle});})
      .catch((err)=>{return next(err);});

    // Data from request is valid.
    //console.log(vehicle);
    //res.send(vehicle);
  },
];

//Update vehicle's available parameter set
//For POST /availparams/:vin
//Body contains an array of strings of available parameter names. 
exports.vehicle_params_update = (req, res, next) => {
  //Find the vehicle with the given vin  
  //console.log(req.body);
  Vehicle.findOne({'vehicleInfo.vin': req.params.vin})
    .then((results)=>{
      //console.log(results);
      if (results == null) {
        //console.log('Vehicle not found');
        const err = new Error("Vehicle not found");
        err.status = 404;
        // return next(err);
        req.send({error:"Error", msg:err});
      }
      // Else, found vehicle, so update.
      // First create a Vehicle object with all the existing data and sent available parameters
      const vehicle = new Vehicle(results);
      const availparamset=req.body; //Array of strings of available parameters
      const logparams=[]; //Will be array of objects with corresponding parameters
      for (let i=0; i<availparamset.length; i++){
        //Check if this param exit in the main database
        OBD2param.findOne({name: availparamset[i]})
        .then((results)=>{
          if (results == null) {
            logparams[i].error="Parameter name does not exit in DB";
          }
          else{
            logparams[i]=results;
            logparams[i].log=false; //Initial value: do not log this parameter
          }
        })
        .catch((err)=>{
          logparams[i].error="Falled to access database";
        });//end of find
      }//End of for
      vehicle.vehicleInfo.availableParamSet=availparamset;
      vehicle.logInfo.logParamSet=logparams;

      Vehicle.findByIdAndUpdate(results._id, vehicle, {})
      .then((theVehicle)=>{
        //console.log(theVehicle);  
        res.send(theVehicle.url);
      })
      .catch((err)=>{return next(err);});
    })
    .catch((err)=>{return next(err);});
};

// Delete vehicle by id.
//For GET /delete/:id
exports.vehicle_delete_get = (req, res, next) => {
  Vehicle.findByIdAndRemove(req.params.id)
  .then(()=>{res.send("Vehicle deleted");})
  .catch((err)=>{return next(err);});
};