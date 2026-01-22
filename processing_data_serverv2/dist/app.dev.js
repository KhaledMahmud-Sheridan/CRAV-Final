"use strict";

var express = require('express');

var conf = require('./config');

var app = express();

var run = require('./utils/kafka_consumer'); // Set up mongoose connection


var mongoose = require("mongoose");

mongoose.set('strictQuery', false);

function generateConnectionId() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var length = 10;
  var connectionId = '';

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    connectionId += characters.charAt(randomIndex);
  }

  return connectionId;
} // WebSocket connection event handler


conf.wss.on('connection', function (ws) {
  console.log('A client connected');
  var connectionId = generateConnectionId();
  ws.id = connectionId; // Add the id to this socket object so we can use
  // Store the connection and associated connection ID

  conf.clients.set(connectionId, ws); // Send the connection ID to the client

  ws.send(connectionId);
  ws.on('message', function (message) {
    // Handle received messages from the client
    //only for the first message
    conf.userWebsocketIDs[JSON.parse(message.toString('utf8'))[1].webSocketID] = JSON.parse(message.toString('utf8'))[0].user;
    console.log('Received message from client:');
    console.log(conf.userWebsocketIDs);
  });
  ws.on('close', function (code, reason) {
    // Event handler for when a WebSocket connection is closed
    console.log("Connection ".concat(connectionId, " has disconnected.")); //remove from dictionary     

    delete conf.userWebsocketIDs[connectionId];
    console.log("deleted from the websocket connection dictionary");
    console.log(conf.userWebsocketIDs);
  });
}); //run the kafka consumer the moment we run the processing app 

run()["catch"](console.error); // Add more routes and middleware as needed

app.listen(conf.port, function () {
  console.log("Server is running on port ".concat(conf.port));
});