"use strict";

var conf = require('../config');

var WebSocket = require('isomorphic-ws');

function run() {
  return regeneratorRuntime.async(function run$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(conf.consumer.connect());

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(conf.consumer.subscribe({
            topic: 'my-topic2',
            fromBeginning: true
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(conf.consumer.run({
            eachMessage: function eachMessage(_ref) {
              var topic, partition, message, k, key;
              return regeneratorRuntime.async(function eachMessage$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      topic = _ref.topic, partition = _ref.partition, message = _ref.message;
                      //the data is coming here based on the upload interval for the vehicle 
                      //do something with this data once we have it 
                      //establish websocket connection 
                      console.log({
                        partition: partition,
                        offset: message.offset,
                        value: JSON.parse(message.value.toString()).data.vin
                      });
                      console.log(conf.userWebsocketIDs);
                      k = "";

                      for (key in conf.userWebsocketIDs) {
                        if (JSON.parse(message.value.toString()).email == conf.userWebsocketIDs[key]) {
                          k = key.toString();
                        }
                      } // Establish WebSocket connection with clients
                      //lookup the websocket for this specific user and then send it 


                      conf.wss.clients.forEach(function _callee2(client) {
                        var obdParams, apiep;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                if (!(client.readyState === WebSocket.OPEN && client.id == k)) {
                                  _context2.next = 9;
                                  break;
                                }

                                console.log("sending message to client");
                                obdParams = {
                                  "obdParams": JSON.parse(message.value.toString()).data.parameterSet
                                };
                                apiep = conf.apiserver + '/' + conf.epCrav + '/' + conf.endpointnotification + '/notified';
                                console.log(apiep);
                                _context2.next = 7;
                                return regeneratorRuntime.awrap(fetch(apiep, {
                                  method: 'Post',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(obdParams)
                                }).then(function (response) {
                                  return response.json();
                                }).then(function _callee(data) {
                                  var dataSaved, apiep2;
                                  return regeneratorRuntime.async(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          console.log(data);
                                          dataSaved = {
                                            "vin": JSON.parse(message.value.toString()).data.vin,
                                            "notification": {
                                              "fault_name": data.data.fault_name,
                                              "description": data.data.description,
                                              "obdii_params": data.data.obdii_params
                                            }
                                          };
                                          apiep2 = conf.apiserver + '/' + conf.epCrav + '/' + conf.endpointnotification + '/addNotification';
                                          _context.next = 5;
                                          return regeneratorRuntime.awrap(fetch(apiep2, {
                                            method: 'Post',
                                            headers: {
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(dataSaved)
                                          }).then(function (result) {
                                            //const createdHTMLElement = '<p>New element created on the server</p>';
                                            client.send(data.data.fault_name.toString()); //client.send(createdHTMLElement)
                                          }));

                                        case 5:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  });
                                }));

                              case 7:
                                _context2.next = 10;
                                break;

                              case 9:
                                client.send("not your data");

                              case 10:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            }
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = run;