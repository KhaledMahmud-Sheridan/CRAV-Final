const conf =require('../config');

const express = require("express");
const router = express.Router();

// Require controller modules.
const vehicle_controller = require("../controllers/vehicleController");
const obd2param_controller = require("../controllers/obd2paramController");
const OBD2TS_controller = require("../controllers/obd2_tseriesController");

const service_controller = require("../controllers/serviceController");
const message_controller = require("../controllers/messageController");
const msgstream_controller = require("../controllers/msgstreamController");

const test_controller = require("../controllers/testController");
router.get("/kmtest", test_controller.kmtest_get);
router.post("/kmtest", test_controller.kmtest_post);

/////(1) Routes for /vehicle/ end-points
const epvehicle=conf.endpointVehicle;
// GET request for list of all vehicles.
router.get(`/${epvehicle}/list`, vehicle_controller.vehicle_list);
router.get(`/${epvehicle}/list/:num`, vehicle_controller.vehicle_list);
// GET request for one vehicle, by id.
router.get(`/${epvehicle}/id/:id`, vehicle_controller.vehicle_id);
// GET request for one vehicle, by vin.
router.get(`/${epvehicle}/vin/:vin`, vehicle_controller.vehicle_vin);
// GET request to get logging parameter list of the vehicle.
router.get(`/${epvehicle}/loginfo/:vin`, vehicle_controller.vehicle_loginfo_get);

// POST request for creating vehicle.
router.post(`/${epvehicle}/create`, vehicle_controller.vehicle_create_post);
// POST request to update available parameters in the vehicle. Called by the car/scanner
router.post(`/${epvehicle}/availparams/:vin`, vehicle_controller.vehicle_params_update);
// POST request to update vehicle.
router.post(`/${epvehicle}/update`, vehicle_controller.vehicle_update);
// GET request to delete vehicle.
router.get(`/${epvehicle}/delete/:id`, vehicle_controller.vehicle_delete_get);

////(2) Routes for /obd2param/ endpoints
const obd2param=conf.endpointOBD2Param;
// GET request for list of all obd2 parameters.
router.get(`/${obd2param}/list`, obd2param_controller.param_list);
router.get(`/${obd2param}/list/:num`, obd2param_controller.param_list);
//Get a specific doc
router.get(`/${obd2param}/id/:id`, obd2param_controller.param_id);
router.get(`/${obd2param}/name/:name`, obd2param_controller.param_name);

router.post(`/${obd2param}/create`, obd2param_controller.param_create_post);
router.post(`/${obd2param}/update`, obd2param_controller.param_update);
router.get(`/${obd2param}/delete/:id`, obd2param_controller.param_delete_get);


/////(3) Routes for /obd2ts/ end-points
const epobd2ts=conf.endpointOBD2TS;
// GET request for list of all OBD2TS.
router.get(`/${epobd2ts}/list`, OBD2TS_controller.OBD2TS_list);
router.get(`/${epobd2ts}/list/:num`, OBD2TS_controller.OBD2TS_list);
// GET request for one OBD2TS, by id.
router.get(`/${epobd2ts}/id/:id`, OBD2TS_controller.OBD2TS_id);
// GET request for one OBD2TS, by vin.
router.get(`/${epobd2ts}/vin/:vin`, OBD2TS_controller.OBD2TS_vin);
router.get(`/${epobd2ts}/vin/:vin/num/:num`, OBD2TS_controller.OBD2TS_vin);
//
router.get(`/${epobd2ts}/vin/:vin/timestamp/:timestamp`, OBD2TS_controller.OBD2TS_timestamp);
router.get(`/${epobd2ts}/vin/:vin/timestamp/:timestamp/num/:num`, OBD2TS_controller.OBD2TS_timestamp);
router.get(`/${epobd2ts}/vin/:vin/starttime/:starttime/endtime/:endtime`, OBD2TS_controller.OBD2TS_timerange);
router.get(`/${epobd2ts}/vin/:vin/starttime/:starttime/endtime/:endtime/num/:num`, OBD2TS_controller.OBD2TS_timerange);

// POST request for creating OBD2TS obj.
router.post(`/${epobd2ts}/create`, OBD2TS_controller.OBD2TS_create_post);
// GET request to delete OBD2TS obj.
router.get(`/${epobd2ts}/delete/:id`, OBD2TS_controller.OBD2TS_delete_get);
// POST request to update OBD2TS obj.
router.post(`/${epobd2ts}/update`, OBD2TS_controller.OBD2TS_update);

module.exports = router;