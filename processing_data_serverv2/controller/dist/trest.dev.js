"use strict";

var conf = require('../config');

var Vehicle = require("../models/notification");

exports.vehicle_list = function (req, res, next) {
  Notification.find().then(function (results) {
    res.send({
      data: results
    });
  });
};