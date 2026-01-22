"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// const axios = require('axios');
var t = {};

function onclickcallback1(urlvin) {
  alert(urlvin);
}

;

var postJSON_vehicle_create = function postJSON_vehicle_create(formid) {
  var data;
  return regeneratorRuntime.async(function postJSON_vehicle_create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = form2JSON(formid); //console.log ("In Scrpt 1", data);

          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/demo/vehicle/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            return console.log(data);
          })["catch"](function (error) {
            return console.error(error);
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Using fetch to send form data


function form2JSON(formid) {
  var form = document.getElementById(formid); //const form = document.querySelector('#my-form');

  var formData2 = new FormData(form);
  var data = Array.from(formData2.entries()).reduce(function (prev, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (key.includes('.')) {
      var keys = key.split('.');
      var obj = prev;

      for (var i = 0; i < keys.length - 1; i++) {
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
  }, {}); //console.log(data);

  return data;
} //display the graph if the specific element checkbox been checked 


var checkboxes = document.querySelectorAll('input[type="checkbox"]');

function handleCheckboxChange(checkbox) {
  var plotDiv = document.getElementById("div-".concat(checkbox.id));

  if (checkbox.checked) {
    console.log(checkbox.id + "has been checked");
    plotDiv.style.display = "block";
  } else {
    plotDiv.style.display = "none";
  }
} //display the start and end time input based on the user choice of the radio button 


function handleRadioButtonClick(RBtn) {
  var d = new Date().toJSON().slice(0, 16);
  inputHideEnd = document.getElementById('inputHideEnd');
  inputHideStart = document.getElementById('inputHideStart');
  start_time = document.getElementById('start_time');
  end_time = document.getElementById('end_time');

  if (RBtn.value === 'Past Data' && RBtn.checked) {
    //past data has been checked -> show the timing 
    inputHideEnd.style.display = 'block';
    inputHideStart.style.display = 'block';
    start_time.value = "";
    end_time.value = "";
    start_time.required = true;
    end_time.required = true;
  } else {
    start_time.required = false;
    end_time.required = false;
    start_time.value = d;
    end_time.value = d;
    console.log(start_time);
    inputHideEnd.style.display = 'none';
    inputHideStart.style.display = 'none';
  }
}
//# sourceMappingURL=script1.dev.js.map
