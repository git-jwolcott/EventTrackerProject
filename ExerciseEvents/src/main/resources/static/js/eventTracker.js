window.addEventListener("load", function () {
  init();
});

function init() {
    document.searchForm.lookup.addEventListener("click", function (event) {
      event.preventDefault();
      var logId = document.searchForm.logId.value;
      if (!isNaN(logId) && logId > 0) {
        getLog(logId);
      }
    });
      document.logListForm.addLog.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (evt.target !== null) {
          createLog();
        }
      })
}
function getLog(logId) {
    // TODO:
    // * Use XMLHttpRequest to perform a GET request to "api/logs/"
    //   with the logId appended.
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/logs/' + logId);
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // * On success, if a response was received parse the log data
          //   and pass the log object to displayLog().
          let log = JSON.parse(xhr.responseText);
          displayLog(log);
        } else {
          // * On failure, or if no response text was received, put "Log not found"
          //   in the logData div.
          if (xhr.status >= 400 || xhr.responseText === '') {
            displayError(document.getElementById('logData'), "Log not found.");
          }
        }
      }
    };
    xhr.send();
  }

  function displayError(div, msg) {
    div.textContent = msg;
    div.style.color = "red";
  }

  function displayLog(log) {
    let dataDiv = document.getElementById('logData');
    dataDiv.textContent = '';
    dataDiv.style.color = '';
    let h1 = document.createElement('h1');
    h1.textContent = log.title;
    h1.style.color = "purple";
    dataDiv.appendChild(h1);
    let ul = document.createElement('ul');
    ul.class = 'list-group';
    let typeLi = document.createElement('li');
    typeLi.class = 'list-group-item';
    typeLi.textContent = "Exercise Type: " + log.type;
    ul.appendChild(typeLi);
    let startTimeLi = document.createElement('li');
    let strTime = Date(log.startTime);
    startTimeLi.innerHTML = strTime.toString();
    startTimeLi.textContent = "Start Date/Time: " + strTime;
    startTimeLi.class = 'list-group-item';
    ul.appendChild(startTimeLi);
    let endTimeLi = document.createElement('li');
    let eTime = Date(log.endTime);
    endTimeLi.innerHTML = eTime.toString();
    endTimeLi.textContent = "End Date/Time: " + eTime;
    endTimeLi.class = 'list-group-item';
    ul.appendChild(endTimeLi);
    let caloriesBurnedLi = document.createElement('li');
    caloriesBurnedLi.textContent = "Calories Burned: " + log.caloriesBurned;
    caloriesBurnedLi.class = 'list-group-item';
    ul.appendChild(caloriesBurnedLi);
    let distanceLi = document.createElement('li');
    distanceLi.textContent = "Distance: " + log.distance + " miles";
    distanceLi.class = 'list-group-item';
    ul.appendChild(distanceLi);
    let averagePaceLi = document.createElement('li');
    averagePaceLi.textContent = "Average Pace: " + Date.parse(log.averagePace);
    averagePaceLi.class = 'list-group-item';
    ul.appendChild(averagePaceLi);
    let elevationGainLi = document.createElement('li');
    elevationGainLi.textContent = "Elevation Gain: " + log.elevationGain;
    elevationGainLi.class = 'list-group-item';
    ul.appendChild(elevationGainLi);
    let latLi = document.createElement('li');
    latLi.textContent = "Trailhead Latitude: " + log.latitude;
    latLi.class = 'list-group-item';
    ul.appendChild(latLi);
    let longLi = document.createElement('li');
    longLi.textContent = "Trailhead Longitude: " + log.longitude;
    longLi.class = 'list-group-item';
    ul.appendChild(longLi);
    dataDiv.appendChild(ul);
  }

  function createLog() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/logs');
    xhr.setRequestHeader("Content-type", "application/json"); //specify JSON request body
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          // * On success, if a response was received parse the log data
          let log = JSON.parse(xhr.responseText);
          displayLog(log);
        } else {
          // * On failure, or if no response text was received, put "Log not created"
          //   in the logData div.
          if (xhr.status >= 400 || xhr.responseText === '') {
            displayError(document.getElementById('logData'), "Log not created. Invalid data.");
          }
        }
      }
    };
    //create request body for 'POST'
    var logObject = {
      title: document.logListForm.title.value,
      type: document.logListForm.type.value,
      startTime: document.logListForm.startTime.value,
      endTime: document.logListForm.endTime.value,
      caloriesBurned: document.logListForm.caloriesBurned.value,
      distance: document.logListForm.distance.value,
      averagePace: document.logListForm.averagePace.value,
      elevationGain: document.logListForm.elevationGain.value
    };
    var logObjectJson = JSON.stringify(logObject); //convert JS object to JSON string
    xhr.send(logObjectJson);
  }

//xhr.open(`DELETE', /api/events/${eventId}`);
