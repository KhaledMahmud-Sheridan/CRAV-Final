// const axios = require('axios');

const t = {};
var xLData = [];
var yLData =[];
var plotxVar = {};
var plotyVar = {}; 

function onclickcallback1(urlvin){
    alert(urlvin);
  };

const postJSON_vehicle_create= async function (formid){
  const data=form2JSON(formid);

  //console.log ("In Scrpt 1", data);
  await fetch('/demo/vehicle/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
}
//Using fetch to send form data
function form2JSON(formid){
  const form =document.getElementById(formid);
  //const form = document.querySelector('#my-form');

  const formData2 = new FormData(form);

  const data = Array.from(formData2.entries()).reduce((prev, [key, value]) => {
      if (key.includes('.')) {
          const keys = key.split('.');
          let obj = prev;
          for (let i = 0; i < keys.length - 1; i++) {
          if (!obj[keys[i]]) {
              obj[keys[i]] = {};
          }
          obj = obj[keys[i]];
          }
          obj[keys[keys.length - 1]] = value;
      } else {
          prev[key] = value;
      }
      return prev;
      }, {}
  );
  //console.log(data);
  return data;
} 


//display the graph if the specific element checkbox been checked 
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
function handleCheckboxChange(checkbox) {
  const plotDiv = document.getElementById(`div-${checkbox.id}`);
  if (checkbox.checked) {
    console.log(checkbox.id + "has been checked");
    plotDiv.style.display = "block";
  }
  else{
    plotDiv.style.display = "none";
  }
  
}

//display the start and end time input based on the user choice of the radio button 
function handleRadioButtonClick(RBtn){
  // const d = new Date().toJSON().slice(0, 16);
  const d = new Date()
  var formPostURL = ""; 
  inputHideEnd = document.getElementById('inputHideEnd');
  inputHideStart = document.getElementById('inputHideStart');
  start_time = document.getElementById('start_time');
  end_time = document.getElementById('end_time')
  myForm = document.getElementById("myForm");
 
  if(RBtn.value === 'Past Data'){
    //past data has been checked -> show the timing 
    inputHideEnd.style.display = 'block';
    inputHideStart.style.display = 'block';
    start_time.value = "";
    end_time.value = "";
    start_time.required = true;
    end_time.required = true;
    myForm.action= `${window.location.href.split('/data')[0]}/data-past`
    
  }
  else if (RBtn.value === 'Live Data'){    
    start_time.required = false;
    end_time.required = false;
    start_time.value = d;
    end_time.value = d;
    inputHideEnd.style.display = 'none';
    inputHideStart.style.display = 'none';
    myForm.action =`${window.location.href.split('/data')[0]}/data-live`
  }
         
} 

















  
  



