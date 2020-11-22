window.addEventListener('load', function () {
    getLogs();
  init();
});

function init() {
    document.searchForm.lookup.addEventListener('click', function (event) {
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
      });
};

function getLogs() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/logs');

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                let logs = JSON.parse(xhr.responseText);
                displayLogList(logs);
            }
            else {
                if(xhr.status >= 400 || xhr.responseText === ''){
                    displayError(document.getElementById('logData'), "List not found.");
                }
            }
        }
    };
    xhr.send();
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
            displayError(document.getElementById('logData'), 'Log not found.');
          }
        }
      }
    };
    xhr.send();
  }

  function displayError(div, msg) {
    div.textContent = msg;
    div.style.color ='red';
  }

  function displayLogList(logs){
      let iAmHere = document.getElementById('div2');
      if(typeof(iAmHere) != 'undefined' && iAmHere !=null){
        let i = logs.length -1;
        let tBody = document.getElementById('logTableTBody');
        let tr = document.createElement('tr');
        tr.setAttribute('class','text-center');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        td1.textContent = i+1;
        td2.textContent = logs[i].title;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tBody.appendChild(tr);
      }
      else {
      let div = document.createElement('div');
      div.setAttribute('id', 'div2');
      document.body.appendChild(div);
      document.body.insertBefore(div, document.getElementById('firstBr').nextSibling);
      let table = document.createElement('table');
      table.setAttribute('class', 'table table-striped table-hover');
      table.setAttribute('id','logTable');
        let head = document.createElement('thead');
        head.setAttribute('class','thead thead-dark');
        let headTr1 = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.setAttribute('class','text-center');
        th1.colSpan = '2';
        th1.textContent = 'Exercise Logs';
        let headTr2 = document.createElement('tr');
        let th2 = document.createElement('th');
        th2.setAttribute('class','text-center');
        th2.textContent = 'Log Id';
        let th3 = document.createElement('th');
        th3.setAttribute('class','text-center');
        th3.textContent = 'Exercise Log Title';
        headTr1.appendChild(th1);
        head.appendChild(headTr1);
        headTr2.appendChild(th3);
        headTr2.appendChild(th2);
        head.appendChild(headTr2);
        table.appendChild(head);
        let tBody = document.createElement('tbody');
        tBody.setAttribute('id', 'logTableTBody');
        for(let i = 0; i < logs.length; i++){
            let tr = document.createElement('tr');
            tr.setAttribute('class','text-center');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.textContent = i+1;
            td2.textContent = logs[i].title;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tBody.appendChild(tr);
        }
        table.appendChild(tBody);
        div2.appendChild(table);
    }
        // document.body.appendChild(table);
        // document.body.insertBefore(table, document.getElementById('div2'));
  };
  function displayLog(log) {
    let dataDiv = document.getElementById('logData');
    dataDiv.textContent = '';
    dataDiv.style.color = '';
    let h1 = document.createElement('h1');
    h1.textContent = log.title;
    h1.style.color = 'purple';
    dataDiv.appendChild(h1);
    let ul = document.createElement('ul');
    ul.class = 'list-group';
    let typeLi = document.createElement('li');
    typeLi.class = 'list-group-item';
    typeLi.textContent = "Exercise Type: " + log.type;
    ul.appendChild(typeLi);
    let startTimeLi = document.createElement('li');
    let strTime = log.startTime.toString();
    startTimeLi.innerHTML = strTime;
    startTimeLi.textContent = "Start Date/Time: " + strTime;
    startTimeLi.class = 'list-group-item';
    ul.appendChild(startTimeLi);
    let endTimeLi = document.createElement('li');
    let eTime = log.endTime.toString();
    endTimeLi.textContent = 'End Date/Time: ' + eTime;
    endTimeLi.class = 'list-group-item';
    ul.appendChild(endTimeLi);
    let caloriesBurnedLi = document.createElement('li');
    caloriesBurnedLi.textContent = 'Calories Burned: ' + log.caloriesBurned;
    caloriesBurnedLi.class = 'list-group-item';
    ul.appendChild(caloriesBurnedLi);
    let distanceLi = document.createElement('li');
    distanceLi.textContent = 'Distance: ' + log.distance + " miles";
    distanceLi.class = 'list-group-item';
    ul.appendChild(distanceLi);
    let averagePaceLi = document.createElement('li');
    averagePaceLi.textContent = 'Average Pace: ' + log.pace + " minutes/mile";
    averagePaceLi.class = 'list-group-item';
    ul.appendChild(averagePaceLi);
    let elevationGainLi = document.createElement('li');
    elevationGainLi.textContent = 'Elevation Gain: ' + log.elevationGain;
    elevationGainLi.class = 'list-group-item';
    ul.appendChild(elevationGainLi);
    let latLi = document.createElement('li');
    latLi.textContent = 'Trailhead Latitude: ' + log.latitude;
    latLi.class = 'list-group-item';
    ul.appendChild(latLi);
    let longLi = document.createElement('li');
    longLi.textContent = 'Trailhead Longitude: ' + log.longitude;
    longLi.class = 'list-group-item';
    ul.appendChild(longLi);
    dataDiv.appendChild(ul);
  }

  function createLog() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/logs');
    xhr.setRequestHeader('Content-type', 'application/json'); //specify JSON request body
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          // * On success, if a response was received parse the log data
          let log = JSON.parse(xhr.responseText);
          getLogs();
          displayLog(log);
        } else {
          // * On failure, or if no response text was received, put "Log not created"
          //   in the logData div.
          if (xhr.status >= 400 || xhr.responseText === '') {
              if(xhr.status)
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
      elevationGain: document.logListForm.elevationGain.value
    };
    //check values
    var logObjectJson = JSON.stringify(logObject); //convert JS object to JSON string
    xhr.send(logObjectJson);
  }

//xhr.open(`DELETE', /api/events/${eventId}`);
