const conf =require('../config');
const WebSocket = require('isomorphic-ws');

async function run(){
    // Consuming
    await conf.consumer.connect()
    await conf.consumer.subscribe({ topic: 'my-topic2', fromBeginning: true })
    await conf.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        //the data is coming here based on the upload interval for the vehicle 
        //do something with this data once we have it 
        //establish websocket connection 
        console.log({
          partition,
          offset: message.offset,
          value: JSON.parse(message.value.toString()).data.vin
        })
  
        console.log(conf.userWebsocketIDs)
        var k = "";
        for (let key in conf.userWebsocketIDs ){
          if(JSON.parse(message.value.toString()).email == conf.userWebsocketIDs[key] ){
            k = key.toString();
          }
        }
  
      
        // Establish WebSocket connection with clients
        //lookup the websocket for this specific user and then send it 
        conf.wss.clients.forEach(async (client) => {
          if (client.readyState === WebSocket.OPEN && client.id == k ) {
            console.log("sending message to client")
            let obdParams = {"obdParams" : JSON.parse(message.value.toString()).data.parameterSet}
            const apiep = conf.apiserver+'/'+conf.epCrav+'/'+conf.endpointnotification+'/notified'; 
            console.log(apiep)

            await fetch((apiep) , {
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(obdParams)
            })
            .then(response => response.json())
            .then(async (data)=>{
                console.log(data)
                const dataSaved = {
                  "vin": JSON.parse(message.value.toString()).data.vin,
                  "notification" : {
                      "fault_name": data.data.fault_name,
                      "description": data.data.description,
                      "obdii_params": data.data.obdii_params
                  }
              }
              const apiep2 = conf.apiserver+'/'+conf.epCrav+'/'+conf.endpointnotification+'/addNotification'
              await fetch(apiep2 ,{
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataSaved)
            } )
            .then((result)=>{
              //const createdHTMLElement = '<p>New element created on the server</p>';
              client.send(data.data.fault_name.toString());
              //client.send(createdHTMLElement)
            })
                


                //we need to save this notification to this specific vehicle by calling
                //http://localhost:3001/logdata/notification/addNotification

                
            })
            
          }
          else{
            client.send("not your data")
          }
      })  
    }
  })
  }


module.exports = 
run;
