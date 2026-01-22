const conf =require('../config');
const { body, validationResult } = require("express-validator");


// Display list of all vehicles.
exports.vehicle_list = async function (req, res, next) {
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/list/1000'; //"http://localhost:3001/logdata/vehicle/list"
  const results=await fetch(apiep);
  const jsondata= await results.json();

  res.render("vehicle_list", {layout : 'layout.pug' ,data: jsondata.data, currentTab: 'vehicle'});
};

// Display detail page for a specific vehicle.
exports.vehicle_detail = async function (req, res, next) {
  console.log(req.params.vin);

  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/vin/'+req.params.vin;
  //console.log(apiep);
  const results=await fetch(apiep);
  const jsondata= await results.json();

  // Successful, so render.
  //console.log(jsondata.data);
  res.render("vehicle_detail", {layout : 'layout.pug' ,title: jsondata.title, vehicle: jsondata.data}  );
};


// Display data form on GET.
exports.vehicle_display_data = (req, res, next) => {
  var lay = "user_layout.pug";
  if(req._parsedOriginalUrl.pathname != "/user/displaydata"){
    lay = "layout.pug"
  }
  
  res.render("display_data",{layout:lay ,data: [] ,message: "" , dict_data: {}, isLive:false,   currentTab: 'loggedData' })
};
// Handle Display live Data on POST.
exports.display_live_data = async (req, res, next) => {
  const dict_data ={};
  const A = [];
  var message = "";
  var isLive = false;
  var lay = "user_layout.pug";
  apiep = conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/vin/'+req.body.vin;
  console.log(req.url)
  if(req.url == '/displaydata'  || req.url == '/displaydata/data-past' || req.url == '/displaydata/data-live'  ){
    lay = "layout.pug"
  }

  await fetch(apiep, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
  .then(response => response.json())      
  .then(data => {
    //list of params 
    var params = data.data.vehicleInfo.availableParamSet;
    
    
    for (i in params){
      if (! dict_data.hasOwnProperty(params[i])){
        dict_data[params[i]] = {};
      }
    }
    message =`The data will be updated every ${data.data.logInfo.uploadInterval} seconds `;
    res.render("display_data",{layout:lay , ap :conf.apiserver+'/'+conf.epCrav+'/'+conf.epOBD2TS,message: message , dict_data: dict_data , current_time :req.query.start_date,vin:data.data.vehicleInfo.vin ,uploadInt:data.data.logInfo.uploadInterval, isLive:true,  currentTab: 'loggedData'})
  })
  .catch(error => {
    message = "Please enter a valid vin number"; 
    res.render("display_data",{layout:lay  ,message: message,ap :conf.apiserver+'/'+conf.epCrav+'/'+conf.epOBD2TS, dict_data: {},isLive:isLive,  currentTab: 'loggedData' }) 
  })


}
// Handle Display past Data on POST.
exports.display_past_data = async (req, res, next) => {
  const dict_data ={};
  const A = [];
  var message = "";
  var isLive = false;
  var lay = "user_layout.pug";

  var apiep = `${conf.apiserver}/${conf.epCrav}/${conf.epOBD2TS}/vin/${req.body.vin}/starttime/${req.body.start_date}/endtime/${req.body.end_date}/num/300`;
  console.log(req.url)
  if(req.url == '/displaydata'  || req.url == '/displaydata/data-past' || req.url == '/displaydata/data-live'  ){
    lay = "layout.pug"
  }

  await fetch(apiep, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
  .then(response => response.json())
  .then(data => {
    // console.log(Object.values(data.data).length);

    if (Object.values(data.data).length != 0){

      for (let i = 0; i <Object.values(data.data).length ; i++) {
        //console.log("current logged data " + data.data[i].vin);

        for (let k in data.data[i].parameterSet ) {
          const value = data.data[i].parameterSet[k];
          //console.log("value " + value)

          if (! dict_data.hasOwnProperty(k)){
            dict_data[k] = {};
          } 
          dict_data[k][data.data[i].timestamp] = value;
          //console.log(`the timestamp ${data.data[i].timestamp} for the value ${value}`)
        }
      } 
      message = `Data Logged Between ${req.body.start_date} and ${req.body.end_date}` ;
      res.render("display_data",{layout: lay ,message: message, dict_data: dict_data, isLive:isLive ,  currentTab: 'loggedData'})  
      
    }
    else{
      message = "Please enter a valid information"
      res.render("display_data",{layout:lay,message: message, dict_data: {}, isLive:isLive ,  currentTab: 'loggedData' })

    } 
  })
  .catch(error => {
    message = "Please enter a valid information"
    res.render("display_data",{layout:lay ,message: message, dict_data: {}, isLive:isLive ,  currentTab: 'loggedData'})
  });
  

}


// Display Vehicle create form on GET.
exports.vehicle_create_get = (req, res, next) => {
  res.render("vehicle_form", { layout : 'layout.pug' ,title: "Create Vehicle",   currentTab: 'newVehicle' });
};


// Handle Vehicle create on POST.
exports.vehicle_create_post = async (req, res, next) => {
  const data=req.body;
  //console.log("In vehicle controller", req.body);
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/create';
  const vehObj={
    vehicleInfo: {
      vin: data['vehicleInfo.vin'],
      make: data['vehicleInfo.make'],
      model: data['vehicleInfo.model'],
      trim: data['vehicleInfo.trim'],
      year: data['vehicleInfo.year'],
      featureSet: data['vehicleInfo.featureSet'],
      scannerID: data['vehicleInfo.scannerID'],
      availableParamSet:[]
    },
    user: {
      userID: data['user.userID'],
      userKey: data['user.userKey'],
    },
    logInfo: {
      logParamSet:[],
      logActive: false,
      logInterval: data['logInfo.logInterval'],
      uploadInterval: data['logInfo.uploadInterval'],
    }
  };
  //console.log("1. In crav", vehObj);
  await fetch(apiep, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehObj)
    }
  )
  .then(response => response.json())
  .then(data => {
    res.redirect(conf.approot+'/'+conf.epVehicle);
  })
  .catch(error => {
    //console.error(error);
    res.send("Error");
  
  });

};

// Display Vehicle update form on GET.
exports.vehicle_update_get =  async function (req, res) {
  //console.log(req.params.vin);
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/vin/'+req.params.vin;
  //console.log(apiep);
  const results=await fetch(apiep);
  const jsondata= await results.json();

  // Successful, so render.
  //console.log(jsondata.data);
  res.render("vehicle_update", {layout : 'layout.pug' ,vehicle: jsondata.data});

};

// Handle Vehicle update on POST.
//body should contain json object containing data according to the full vehicle scema 
exports.vehicle_update_post = async (req, res, next) => {
  const data=req.body;
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/vin/'+data['vehicleInfo.vin'];

  const results=await fetch(apiep);
  const jsondata= await results.json();
  const logparams=jsondata.data.logInfo.logParamSet;
  //console.log(logparams);
  for (i=0;i<logparams.length; i++)
  {
    if (logparams[i].name in data) {logparams[i].log=true; }
    else {logparams[i].log=false;}
  }
  
  const vehObj={
    vehicleInfo: {
      vin: data['vehicleInfo.vin'],
      make: data['vehicleInfo.make'],
      model: data['vehicleInfo.model'],
      trim: data['vehicleInfo.trim'],
      year: data['vehicleInfo.year'],
      featureSet: data['vehicleInfo.featureSet'],
      scannerID: data['vehicleInfo.scannerID'],
      availableParamSet:jsondata.data.vehicleInfo.availableParamSet
    },
    user: {
      userID: data['user.userID'],
      userKey: data['user.userKey'],
    },
    logInfo: {
      logParamSet:logparams,
      logActive: data['logInfo.logActive']=='on'? true:false,
      logInterval: data['logInfo.logInterval'],
      uploadInterval: data['logInfo.uploadInterval'],
    },
    _id: data['_id']
  };

  lbody=JSON.stringify(vehObj);
  //res.send(vehObj);
  const apiep_update=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/update';

  await fetch(apiep_update, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehObj)
    }
  )
  .then(response => response.json())
  
  .then(data => {
    res.redirect(conf.approot+'/'+conf.epVehicle);
  })
  .catch(error => {
    res.send(error);
  });
};


// Display Author delete form on GET.
exports.vehicle_delete_get = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).then((data)=>{callback(null,data)});
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }).then((data)=>{callback(null,data)});
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        // No results.
        res.redirect("/catalog/authors");
      }
      // Successful, so render.
      res.render("author_delete", {
        title: "Delete Author",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
};

// Handle Author delete on POST.
exports.vehicle_delete_post= async (req, res) => {
  console.log("in Delete post", req.body.vehicleid);


  const data=req.body;
  //console.log(data['vehicleInfo.vin']);
  const apiep=conf.apiserver+'/'+conf.epCrav+'/'+conf.epVehicle+'/delete/'+req.body.vehicleid;

  const results=await fetch(apiep);
  //const jsondata= await results.json();
  res.redirect(conf.approot+'/'+conf.epVehicle);

};
