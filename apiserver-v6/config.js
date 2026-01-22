//Web Server
exports.port=3001;

//Databse//
//Local database name
const mongoDBURL="mongodb://127.0.0.1:27017";
const databaseName='dbtest3'; 

//Database location
const localDatabase=false;
var mongoDB="";
if (localDatabase) 
    mongoDB= 'mongodb://127.0.0.1:27017'+'/'+databaseName;
else
//mongodb+srv://aljamald:123@cmi-rogers.3afz8dj.mongodb.net/?retryWrites=true&w=majority

mongoDB = "mongodb+srv://aljamald:123@cmi-rogers.3afz8dj.mongodb.net/av5?retryWrites=true&w=majority";
exports.mongoDB=mongoDB;
//Save the names of the collection here
exports.parameterCollection='parameter';
exports.msgstreamCollection='msgstream';
exports.serviceCollection='service';
exports.vehicleCollection='vehicle';
exports.messageCollection='message';
exports.OBD2_tseriesCollection='obd2tseries';

//Routes////////////////////
//Root endpoint for uses
exports.endpointusers='users';
//Root endpoint for logging project
exports.endpointcrav='logdata';
//Endpoint of OBD2 time series logging
exports.endpointOBD2TS='obd2ts';
exports.endpointVehicle='vehicle';
exports.endpointMessage='message';
exports.endpointService='service';
exports.endpointOBD2Param='obd2param';
exports.endpointMsgstream='msgstream';


//Max returns
exports.listMax=10;

