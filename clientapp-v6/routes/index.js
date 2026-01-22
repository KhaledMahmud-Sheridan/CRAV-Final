var express = require('express');
const conf =require('../config');


var router = express.Router();




const vehicle_controller = require("../controllers/vehicleController");

// GET home page.
router.get("/", function (req, res) {

  res.redirect('/user');
});

router.get('/user', (req, res) => {
  const dict_data ={};
  const A = [];
  res.render('index', {title: `CRAV Version ${conf.version}`, currentTab: 'home'})
});


router.get('/user/displaydata',vehicle_controller.vehicle_display_data);
router.post('/user/displaydata/data-past',vehicle_controller.display_past_data);
router.post('/user/displaydata/data-live',vehicle_controller.display_live_data);


module.exports = router;