const OBD2TS = require("../models/obd2_tseries");
const conf =require('../config');

const { body, validationResult } = require("express-validator");
const async = require("async");
const returnLimit=10;


// Send list of all OBD2TSs.
//Include max num of documents 
//For GET /list/:num
exports.OBD2TS_list = function (req, res, next) {
    let listMax=conf.listMax;
    if(req.params.num!=undefined) {listMax=req.params.num;}

//    console.log(conf.listMax);
    OBD2TS.find().limit(listMax)
    .then((results)=>{res.send({data: results,});})
    .catch((err)=>{return next(err);});
};

// Send detail page for a specific OBD2TS.
//For GET /id/:id
exports.OBD2TS_id = (req, res, next) => {
    OBD2TS.findById(req.params.id)
      .then((results)=>{
        if (results == null) {
          // No results.
          const err = new Error("OBD2TS not found");
          err.status = 404;
          return next(err);
        }
        res.send({ data: results, });
      })
      .catch((err)=>{return next(err);});
  };

//For GET /vin/:vin/num/:num
exports.OBD2TS_vin = (req, res, next) => {
  let listMax=conf.listMax;
  if(req.params.num!=undefined) {listMax=req.params.num;}
  
  OBD2TS.find({vin: req.params.vin}).limit(req.params.num)
    .then((results)=>{
      if (results == null) {
        const err = new Error("vin not found");
        err.status = 404;
        return next(err);
      }
      res.send({  data: results, });
    })
    .catch((err)=>{return next(err);});
};

//By timestamp
//For GET /vin/:vin/timestamp/:timestamp/num/:num
exports.OBD2TS_timestamp = (req, res, next) => {
  let listMax=conf.listMax;
  if(req.params.num!=undefined) {listMax=req.params.num;}

  OBD2TS.find({vin: req.params.vin, timestamp: new Date(req.params.timestamp)}).limit(req.params.num)
    .then((results)=>{
      if (results == null) {
        const err = new Error("OBD2 vin/timestamp not found");
        err.status = 404;
        return next(err);
      }
      res.send({data: results, });
    })
    .catch((err)=>{return next(err); });
  };

//OBD2TS_controller.OBD2TS_timerange
// Send detail page for a specific OBD2TS
//By timestamp
//For GET /vin/:vin/starttime/:starttime/endtime/:endtime/num/:num
exports.OBD2TS_timerange = (req, res, next) => {
  let listMax=conf.listMax;
  if(req.params.num!=undefined) {listMax=req.params.num;}

  OBD2TS.find({vin: req.params.vin, timestamp: {$gte: new Date(req.params.starttime), $lte: new Date(req.params.endtime) }}).limit(listMax)
    .then((results)=>{
      if (results == null) {
        const err = new Error("OBD2 vin/timestamp not found");
        err.status = 404;
        return next(err);
      }
      res.send({data: results, });
    })
    .catch((err)=>{return next(err);});
};


// Handle OBD2TS create on POST.
//For POST /create
exports.OBD2TS_create_post = [
  // Validate and sanitize fields.

  body("data.vin", "vin must be specified").trim().isLength({ min: 1}).escape(),
  body("auth.userID", "userID must be specified").trim().isLength({ min: 1 }).escape(),
  body("auth.userKey", "userKey must be specified").trim().isLength({ min: 1}),
  body("timestamp", "timestamp must be specified").trim().isLength({ min: 1 }).escape(),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    const errors = validationResult(req);

    const auth=req.body.auth; //Authentication data: userID and userKey from vehicle schema
    //Insert code for authentication for the give vin here
    const data=req.body.data;// JSON data received of obs2_tseries scnema 
    //Fix the timestamp
    data.timestamp=new Date(data.timestamp);
    // Create a OBD2TS object with escaped and trimmed data.
    const obd2ts = new OBD2TS(data);
    if (!errors.isEmpty()) {
      // There are errors. 
      res.send({obd2ts, errors: errors.array()});
    }
    // Data from form is valid.
    obd2ts.save()
    .then(()=>{res.send(obd2ts.url);})
    .catch((err)=>{return next(err);});
  },
];

// Delete OBD2TS by id.
//For GET /delete/:id
exports.OBD2TS_delete_get = (req, res, next) => {
  OBD2TS.findByIdAndRemove(req.params.id)
  .then(()=>{res.send("Deleted");})
  .catch((err)=>{return next(err);});
};

//Update OBD2TS by id. Note: this route may not be very useful
//For POST /update
exports.OBD2TS_update = [
  // Validate and sanitize fields.
  body("data.vin", "vin must be specified").trim().isLength({ min: 1}).escape(),
  body("auth.userID", "userID must be specified").trim().isLength({ min: 1 }).escape(),
  body("auth.userKey", "userKey must be specified").trim().isLength({ min: 1}),
  body("timestamp", "timestamp must be specified").trim().isLength({ min: 1 }).escape(),
  
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    //Check if OBD2TS exits with the same id
    // code here
    const auth=req.body.auth; //Authentication data: userID and userKey from vehicle schema
    //Insert code for authentication for the give vin here
    const data=req.body.data;// JSON data received in body, data should include _id field
    // Create a OBD2TS object with escaped and trimmed data.
    const obd2ts = new OBD2TS(data);

    if (!errors.isEmpty()) {
      // There are errors
      res.send({obd2ts, errors: errors.array()});
    }
    OBD2TS.findByIdAndUpdate(data._id, obd2ts, {})
      .then((result)=>{res.send(`${result.url} updated`); })
      .catch((err)=>{return next(err);});
  },
];