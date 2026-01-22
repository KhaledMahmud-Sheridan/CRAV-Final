const conf =require('../config');
const { body, validationResult } = require("express-validator");

// Display list of all obd2params.
exports.obd2param_list = async function (req, res, next) {
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epOBD2Param+'/list/1000'; //"http://localhost:3001/logdata/obd2param/list"
  const results=await fetch(apiep);
  const jsondata= await results.json();
  res.render("obd2param_list", {layout : 'layout.pug' ,data: jsondata.data, currentTab: 'oBD2'});
};


// Display obd2param create form on GET.
exports.obd2param_create_get = (req, res, next) => {
  res.send("In create GET");
};

// Handle obd2param create on POST.
exports.obd2param_create_post = (req, res, next) => {
  res.send("In create GET");
};

// Display obd2param update form on GET.
exports.obd2param_update_get = (req, res, next) => {
  res.send("In update GET");
};

// Handle obd2param update on POST.
exports.obd2param_update_post = (req, res, next) => {
  res.send("In update POST");
};

// Display obd2param delete form on GET.
exports.obd2param_delete_get = (req, res) => {
  res.send("In Delete GET");
};

// Handle obd2param delete on POST.
exports.obd2param_delete_post = (req, res) => {
  res.send("In delete POST");
};
