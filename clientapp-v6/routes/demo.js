const conf =require('../config');
const express = require("express");
const router = express.Router();

// Require controller modules.
const parameter_controller = require("../controllers/obd2paramController");
const vehicle_controller = require("../controllers/vehicleController");
const obd2ts_controller = require("../controllers/obd2tsController");
// const service_controller = require("../controllers/serviceController");

router.get("/", function (req, res) {
    res.render('index', {title: `CRAV Version ${conf.version}`, layout:"layout.pug", currentTab: 'home'});
  });




/// parameter ROUTES ///
const eppara=conf.epOBD2Param;
// GET for parameter
router.get(`/${eppara}`, parameter_controller.obd2param_list);
router.get(`/${eppara}/list`, parameter_controller.obd2param_list);
router.get(`/${eppara}/list/:num`, parameter_controller.obd2param_list);
//GET request for creating paramter.
router.get(`/${eppara}/create`, parameter_controller.obd2param_create_get);
// POST request for creating paramter.
router.post(`/${eppara}/create`, parameter_controller.obd2param_create_post);
//GET request for updating paramter.
router.get(`/${eppara}/update`, parameter_controller.obd2param_update_get);
// POST request for updating Book.
router.post(`/${eppara}/update`, parameter_controller.obd2param_update_post);
//GET request for updating paramter.
router.get(`/${eppara}/delete/:id`, parameter_controller.obd2param_delete_get);
// POST request for updating Book.
router.post(`/${eppara}/delete/:id`, parameter_controller.obd2param_delete_post);

/// vehicle ROUTES ///
const epveh=conf.epVehicle;
// GET request for list of all vehicles.
router.get(`/${epveh}`, vehicle_controller.vehicle_list);
// GET request for one vehicle.
router.get(`/${epveh}/vin/:vin`, vehicle_controller.vehicle_detail);

// GET request for displaydata
router.get("/displaydata",vehicle_controller.vehicle_display_data);
// POST request for display past data
router.post("/displaydata/data-past",vehicle_controller.display_past_data);
// POST request for display live data
router.post("/displaydata/data-live",vehicle_controller.display_live_data);

// GET request for creating vehicle
router.get(`/${epveh}/create`, vehicle_controller.vehicle_create_get);
// POST request for creating Author.
router.post(`/${epveh}/create`, vehicle_controller.vehicle_create_post);
// GET request for updating vehicle
router.get(`/${epveh}/update/vin/:vin`, vehicle_controller.vehicle_update_get);
// GET request for updating vehicle
router.post(`/${epveh}/update/vin/:vin`, vehicle_controller.vehicle_update_post);
//GET request for updating paramter.
router.get(`/${epveh}/delete/:id`, vehicle_controller.vehicle_delete_get);
// POST request for updating Book.
router.post(`/${epveh}/delete`, vehicle_controller.vehicle_delete_post);


/// obd2ts ROUTES ///
// GET request for list of all BookInstance.
//router.get("/obd2ts", obd2ts_controller.obd2ts_list);
// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
//router.get("/obd2ts/create", obd2ts_controller.obd2ts_create_get );

// POST request for creating BookInstance.
//router.post("/obd2ts/create", obd2ts_controller.obd2ts_create_post );


/// service ROUTES ///
// GET request for list of all Genre.
//router.get("/service", service_controller.service_list);
// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
//router.get("/service/create", service_controller.service_create_get);

//POST request for creating Genre.
//router.post("/service/create", service_controller.service_create_post);


module.exports = router;
