const conf =require('../config');
const OBD2param = require("../models/obd2param");

const { body, validationResult } = require("express-validator");
//const async = require("async");

// Send list of all parameters.
//Include max num of documents 
//For GET /list/:num
exports.param_list = function (req, res, next) {
console.log("parameter list")
  let listMax=conf.listMax;
  if(req.params.num!=undefined) {listMax=req.params.num;}

  OBD2param.find().limit(listMax)
  .then((results)=>{res.send({data: results });})
  .catch((err)=>{return next(err);});
};

// Send detail page for a specific parameter.
//By id
//For GET /id/:id
exports.param_id = (req, res, next) => {
    OBD2param.findById(req.params.id)
      .then((results)=>{
        if (results == null) {
          // No results.
          const err = new Error("Parameter not found");
          err.status = 404;
          return next(err);
        }
        // Successful.
        res.send({ data: results });
      })
      .catch((err)=>{
        return next(err);
      });
  };

//By parameter name
///For GET /name/:name
exports.param_name = (req, res, next) => {
    OBD2param.find({name: req.params.name})
      .then((results)=>{
        if (results == null) {
          // No results.
          const err = new Error("Parameter not found");
          err.status = 404;
          return next(err);
        }
        // Successful, so send.
        res.send({data: results, });
      })
      .catch((err)=>{
        return next(err);
      });
  };

// Handle Parameter create on POST.
//For POST /create
exports.param_create_post = [
    // Validate and sanitize fields.
    body("name", "name must be specified").trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      //Check if parameter exits with the same name
      // code here
      const data=req.body;// JSON data received in body 
      // Create a Parameter object with escaped and trimmed data.
      const obd2param = new OBD2param( data);
  
      if (!errors.isEmpty()) {
        // There are errors. 
        res.send({obd2param, errors: errors.array()});
      }
      // Data from form is valid.
      obd2param.save()
      .then(()=>{res.send(obd2param.url);})
      .catch((err)=>{return next(err);});
    },
  ];

//Update Parameter by id
//For POST /update
exports.param_update = [
    // Validate and sanitize fields.
    body("_id", "id must be specified").trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      //Check if paramter exits with the same _id
      // code here
      const data=req.body;// JSON data received in body 
      // Create a Parameter object with escaped and trimmed data.
      const obd2param = new OBD2param(data);
      //obd2param._id=data._id;
  
      if (!errors.isEmpty()) {
        // There are errors. 
        res.send({obd2param, errors: errors.array()});
      }
      // Data from form is valid.
      //console.log(obd2param);
      OBD2param.findByIdAndUpdate(data._id, obd2param, {})
        .then((theParam)=>{res.send(theParam.url);})
        .catch((err)=>{return next(err);});
    },
  ];
  

// Delete parameter by id.
//For GET /delete/:id
exports.param_delete_get = (req, res, next) => {
    OBD2param.findByIdAndRemove(req.params.id)
    .then(()=>{
      // Success 
      res.send("Parameter deleted");
    })
    .catch((err)=>{
      return next(err);
    });
  };