"use strict";

// Start the server
exports.port = 3000;
exports.apiserver = "http://127.0.0.1:3001"; //Root endpoint for logging project

exports.endpointcrav = 'processing'; //Root endpoint for logging project

exports.epCrav = 'logdata';
exports.endpointnotification = "notification";

var _require = require('kafkajs'),
    Kafka = _require.Kafka;

var WebSocket = require('isomorphic-ws');

exports.userWebsocketIDs = {}; // Create a WebSocket server

exports.wss = new WebSocket.Server({
  port: 3003
});
exports.clients = new Map();
var kafka = new Kafka({
  clientId: 'my-consumer',
  //this is the public ip address for my Ec2 
  brokers: ['3.99.221.167:9092']
});
exports.consumer = kafka.consumer({
  groupId: 'test3-group'
});