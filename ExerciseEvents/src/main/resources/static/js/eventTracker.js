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
                    displayError(document.getElementById('logData'), 'List not found.');
                }
            }
        }
    };
    xhr.send();
};
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
  };

  function displayError(div, msg) {
      if(typeof(msg) === 'object'){
          let form = document.getElementById('logListForm');
          let errorMsg =  div.textContent;
          errorMsg = '';
          if(msg.title === '' || msg.title === null){
           errorMsg += 'Title is required.';
          }
          if(msg.startTime === '' || msg.startTime === null ){
              if(errorMsg === ''){
                  errorMsg += 'Start Time is required.'
              }
              else {
                  errorMsg += '\n Start Time is required.'
              }
          }
          if(msg.endTime === '' || msg.endTime === null ){
            if(errorMsg === ''){
                errorMsg += 'End Time is required.'
            }
            else {
                errorMsg += '\n End Time is required.'
            }
        }
        if(msg.distance === '' || msg.distance === null ){
            if(errorMsg === ''){
                    errorMsg += 'Distance is required.'
                }
            else {
                    errorMsg += '\n Distance is required.'
                }
            }
        div.textContent = errorMsg;
        }
        else{
            div.textContent = msg;
        }
    div.style.color ='red';
  };

  function displayLogList(logs){
    let iAmHere = document.getElementById('dataDiv2');
    if(typeof(iAmHere !== undefined) && iAmHere !== null){
        let i = logs.length -1;
        let tBody = document.getElementById('logTableTBody');
        let tr = document.createElement('tr');
            tr.setAttribute('class','text-center');
            tr.addEventListener('click', function(e){
                let log = logs[i];
                displayLog(log);
            });
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
      table.setAttribute('class', 'table table-striped table-hover table-sm table-bordered');
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
            if(logs[i].enabled === 1){
            let tr = document.createElement('tr');
            tr.setAttribute('class','text-center');
            tr.addEventListener('click', function(e){
                let log = logs[i];
                displayLog(log);
            });
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            td1.textContent = i+1;
            td2.textContent = logs[i].title;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tBody.appendChild(tr);
        }
    }
        table.appendChild(tBody);
        div2.appendChild(table);
    };
    let h2 = document.createElement('h2');
    h2.id = 'avgOverallDistance';
    h2.setAttribute('class', 'text-center');
    let averageDistance = 0;
    let count = 0;
    for(let i = 0; i < logs.length; i++){
        if(logs[i].enabled == 1){
        averageDistance += logs[i].distance;
        count ++;
        }
    };
    h2.textContent = "Average Exercise Distance is " + Math.round(((averageDistance/count) + Number.EPSILON)*100)/100 + ' miles.';
    h2.style.color = 'purple';
    document.body.appendChild(h2);
    document.body.insertBefore(h2, document.getElementById('firstBr'));
};
  function displayLog(log) {
    let dataDiv = document.getElementById('logData');
    dataDiv.textContent = '';
    dataDiv.style.color = '';
    let dataDiv2 = document.createElement('div');
    dataDiv2.id = 'dataDiv2';
    dataDiv.appendChild(dataDiv2);
    let displayForm = document.createElement('form');
    displayForm.id = 'displayForm'
    let div = document.createElement('div');
    div.setAttribute('class', 'form-row');
    let div0 = document.createElement('div');
    div0.setAttribute('class', 'form-group col-md-6');
    let titleLabel = document.createElement('label');
    titleLabel.for = 'title';
    titleLabel.style.margin = '5px 5px 5px 5px';
    titleLabel.textContent = 'Title';
    let title = document.createElement('input');
    title.type = 'text';
    title.setAttribute('class', 'form-control');
    title.id = 'title';
    title.value = log.title;
    title.style.margin = '5px 5px 5px 5px';
    div.appendChild(div0);
    div0.appendChild(titleLabel);
    div0.appendChild(title);
    displayForm.appendChild(div);
    let div1 = document.createElement('div');
    div1.setAttribute('class', 'form-row');
    let div2 = document.createElement('div');
    div2.setAttribute('class', 'form-group col-md-6');
    let typeLabel = document.createElement('label');
    typeLabel.for = 'type';
    typeLabel.style.margin = '5px 5px 5px 5px';
    typeLabel.textContent = 'Exercise Type';
    let type = document.createElement('input');
    type.type = 'text';
    type.setAttribute('class','form-control');
    type.id = 'type';
    type.value = log.type;
    type.style.margin = '5px 5px 5px 5px';
    div1.appendChild(div2);
    div2.appendChild(typeLabel);
    div2.appendChild(type);
    displayForm.appendChild(div1);
    let div3 = document.createElement('div');
    div3.setAttribute('class', 'form-row');
    let div4 = document.createElement('div');
    div4.setAttribute('class', 'form-group col-md-6');
    let startTimeLabel = document.createElement('label');
    startTimeLabel.for = 'startTime';
    startTimeLabel.style.margin = '5px 5px 5px 5px';
    startTimeLabel.textContent = 'Start Date/Time';
    let startTime = document.createElement('input');
    startTime.type = 'datetime-local';
    startTime.setAttribute('class','form-control');
    startTime.id = 'startTime';
    startTime.step = 1;
    startTime.style.margin = '5px 5px 5px 5px';
    startTime.value = log.startTime;
    div3.appendChild(div4);
    div4.appendChild(startTimeLabel);
    div4.appendChild(startTime);
    displayForm.appendChild(div3);
    let div5 = document.createElement('div');
    div5.setAttribute('class', 'form-row');
    let div6 = document.createElement('div');
    div6.setAttribute('class', 'form-group col-md-6');
    let endTimeLabel = document.createElement('label');
    endTimeLabel.for = 'endTime';
    endTimeLabel.style.margin = '5px 5px 5px 5px';
    endTimeLabel.textContent = 'End Date/Time';
    let endTime = document.createElement('input');
    endTime.type = 'datetime-local';
    endTime.setAttribute('class','form-control');
    endTime.id = 'endTime';
    endTime.step = 1;
    endTime.style.margin = '5px 5px 5px 5px';
    endTime.value = log.endTime;
    div5.appendChild(div6);
    div6.appendChild(endTimeLabel);
    div6.appendChild(endTime);
    displayForm.appendChild(div5);
    let div7 = document.createElement('div');
    div7.setAttribute('class', 'form-row');
    let div8 = document.createElement('div');
    div8.setAttribute('class', 'form-group col-md-6');
    let caloriesBurnedLabel = document.createElement('label');
    caloriesBurnedLabel.for = 'caloriesBurned';
    caloriesBurnedLabel.style.margin = '5px 5px 5px 5px';
    caloriesBurnedLabel.textContent = 'Calories Burned';
    let caloriesBurned = document.createElement('input');
    caloriesBurned.type = 'number';
    caloriesBurned.setAttribute('class','form-control');
    caloriesBurned.id = 'caloriesBurned';
    caloriesBurned.style.margin = '5px 5px 5px 5px';
    caloriesBurned.value = log.caloriesBurned;
    div7.appendChild(div8);
    div8.appendChild(caloriesBurnedLabel);
    div8.appendChild(caloriesBurned);
    displayForm.appendChild(div7);
    let div9 = document.createElement('div');
    div9.setAttribute('class', 'form-row');
    let div10 = document.createElement('div');
    div10.setAttribute('class', 'form-group col-md-6');
    let distanceLabel = document.createElement('label');
    distanceLabel.for = 'distance';
    distanceLabel.style.margin = '5px 5px 5px 5px';
    distanceLabel.textContent = 'Distance';
    let distance = document.createElement('input');
    distance.type = 'number';
    distance.setAttribute('class','form-control');
    distance.id = 'distance';
    distance.step = 1;
    distance.style.margin = '5px 5px 5px 5px';
    distance.value = log.distance;
    div9.appendChild(div10);
    div10.appendChild(distanceLabel);
    div10.appendChild(distance);
    displayForm.appendChild(div9);
    let div11 = document.createElement('div');
    div11.setAttribute('class', 'form-row');
    let div12 = document.createElement('div');
    div12.setAttribute('class', 'form-group col-md-6');
    let avgPaceLabel = document.createElement('label');
    avgPaceLabel.for = 'averagePace';
    avgPaceLabel.style.margin = '5px 5px 5px 5px';
    avgPaceLabel.textContent = 'Average Pace';
    let avgPace = document.createElement('label');
    avgPace.style.margin = '5px 5px 5px 5px';
    avgPace.textContent = log.pace;
    div11.appendChild(div12);
    div12.appendChild(avgPaceLabel);
    div12.appendChild(avgPace);
    displayForm.appendChild(div11);
    let div13 = document.createElement('div');
    div13.setAttribute('class', 'form-row');
    let div14 = document.createElement('div');
    div14.setAttribute('class', 'form-group col-md-6');
    let elevGainLabel = document.createElement('label');
    elevGainLabel.for = 'elevGain';
    elevGainLabel.style.margin = '5px 5px 5px 5px';
    elevGainLabel.textContent = 'Elevation Gain';
    let elevGain = document.createElement('input');
    elevGain.type = 'number';
    elevGain.step = 1;
    elevGain.setAttribute('class','form-control');
    elevGain.id = 'elevGain';
    elevGain.style.margin = '5px 5px 5px 5px';
    elevGain.value = log.elevationGain;
    div13.appendChild(div14);
    div14.appendChild(elevGainLabel);
    div14.appendChild(elevGain);
    displayForm.appendChild(div13);
    let div15 = document.createElement('div');
    div15.setAttribute('class', 'form-row');
    let div16 = document.createElement('div');
    div16.setAttribute('class', 'form-group col-md-6');
    let latitudeLabel = document.createElement('label');
    latitudeLabel.for = 'latitude';
    latitudeLabel.style.margin = '5px 5px 5px 5px';
    latitudeLabel.textContent = 'Trailhead Latitude';
    let latitude = document.createElement('input');
    latitude.type = 'text';
    latitude.setAttribute('class','form-control');
    latitude.id = 'lat';
    latitude.style.margin = '5px 5px 5px 5px';
    latitude.value = log.latitude;
    div15.appendChild(div16);
    div16.appendChild(latitudeLabel);
    div16.appendChild(latitude);
    displayForm.appendChild(div15);
    let div17 = document.createElement('div');
    div17.setAttribute('class', 'form-row');
    let div18 = document.createElement('div');
    div18.setAttribute('class', 'form-group col-md-6');
    let longitudeLabel = document.createElement('label');
    longitudeLabel.for = 'longitude';
    longitudeLabel.style.margin = '5px 5px 5px 5px';
    longitudeLabel.textContent = 'Trailhead Longitude';
    let longitude = document.createElement('input');
    longitude.type = 'text';
    longitude.setAttribute('class','form-control');
    longitude.id = 'longitude';
    longitude.style.margin = '5px 5px 5px 5px';
    longitude.value = log.longitude;
    div17.appendChild(div18);
    div18.appendChild(longitudeLabel);
    div18.appendChild(longitude);
    displayForm.appendChild(div17);
    let div19 = document.createElement('div');
    div19.setAttribute('class', 'form-row');
    let editButton = document.createElement('input');
    editButton.type = 'submit';
    editButton.setAttribute('class', 'btn btn-outline-primary my-2 my-sm-0');
    editButton.name = 'edit';
    editButton.value = 'Edit';
    displayForm.appendChild(editButton); 
    editButton.addEventListener('click', function(e1){
        e1.preventDefault();
        updateLog(log.id);
    });
    let deleteButton = document.createElement('input');
    deleteButton.type = 'submit';
    deleteButton.setAttribute('class', 'btn btn-outline-primary my-2 my-sm-0');
    deleteButton.name = 'delete';
    deleteButton.value = 'Delete';
    displayForm.appendChild(deleteButton);
    deleteButton.addEventListener('click', function(e){
        e.preventDefault();
        deleteLog(log.id);
    });
    
    dataDiv2.appendChild(displayForm);
  };

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
        } else if(xhr.status === 422){
            //If status 422, then tell the user which field requires data
            let log1 = JSON.parse(xhr.responseText);
            displayError(document.getElementById('logData'), log1);
        }
        else {
          // * On failure, or if no response text was received, put "Log not created"
          //   in the logData div.
          if (xhr.status === 400 || xhr.responseText === '') {
            displayError(document.getElementById('logData'), 'Log not created. Invalid data.');
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
  };

function updateLog(logId){
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `api/logs/${logId}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201){
                let log = JSON.parse(xhr.responseText);
                location.reload();
            }else{
                if(xhr.status >= 400 || xhr.responseText === ''){
                    displayError(document.getElementById('logData'), 'Log not updated. Invalid data.');
                }
            }
        }
    };
    //create request body for 'PUT'
    let logDataDiv = document.getElementById('logData');
    let div2 = logDataDiv.firstChild;
    let form = div2.firstChild;

    var logUpdateObject = {
        title: form.title.value,
        type: form.type.value,
        startTime: form.startTime.value,
        endTime: form.endTime.value,
        caloriesBurned: form.caloriesBurned.value,
        distance: form.distance.value,
        elevationGain: form.elevGain.value,
        latitude: form.lat.value,
        longitude: form.longitude.value
      };
    //   check values
      var logUpdateObjectJson = JSON.stringify(logUpdateObject); //convert JS object to JSON string
      xhr.send(logUpdateObjectJson);
};

//xhr.open(`DELETE', /api/logs/${logId}`);
function deleteLog(logId){
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `api/logs/${logId}`);

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 204 || xhr.status === 200){
               location.reload();
            }
            else if(xhr.status >=400 || xhr.responseText === ''){
                if(xhr.status){
                    displayError(document.getElementById('logData'), 'Log not deleted.');
                }
            }
        }
    };
    xhr.send();
}
