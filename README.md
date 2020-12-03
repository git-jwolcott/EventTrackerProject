# EventTrackerProject
## Week 12 Homework project

### Overview
This is a two phase project.
#### Phase One
##### Learning Objectives
* Create a JPA Project
  * Create a Java entity class POJO that models your database table.
  * Map your POJO using JPA.
* Configure a Spring Boot app to publish a REST API.
  * Use Spring REST annotations.
  * Use Spring Data JPA to perform all CRUD operations.
  * Send and receive JSON.

#### Steps to Accomplish Learning Objectives
1.  Create a new STS workspace for your project.
  * Initialize your workspace with git.
  * Associate your workspace with a Github repo named EventTrackerProject.
2. Use MySQL Workbench to create a database schema with a single table.
  * Be sure to create a appusername@localhost account with a password for your database.
  * Include some initial sample data.
3. Create a Gradle Project for your JPA entity and tests.
4. Create a Spring Boot project for your REST API controller(s), service, and Spring Data JPA repository.
5. Create controller logic to perform the basic CRUD operations of a REST API.
6. Test these routes using Postman
7. Deploy your project to your EC2 instance, and link to it from your portfolio web site.

### Phase Two
#### Learning Objectives
* Adding scripts to a web application
* Send asynchronous requests to Java controllers with JavaScript's XMLHttpRequest
* Consume and parse JSON responses with JavaScript
* Build HTML with JavaScript
* Send POST/PUT/DELETE requests with XMLHttpRequest

#### Steps to Accomplish Learning Objectives
1. Add JavaScript functionality
2. Get all events and display them.
  * In an on load event lister, call a function that executes an XMLHttpRequest to get all of your event objects.
  * When the request returns successfully, build a table to display the list of data.
3. Create a new event
  * On the main page show a form which allows creation of a new entity.
  * Clicking the submit button builds a JSON object from the form field values and send the data to the POST route.
  * Upon successful new object creation, the table reloads showing all objects including the newly created object.
4. Update and delete
  * Clicking a row in the table, shows a detail view the selected object. This is accomplished by adding a click event listener to each row of the table.
  * The detail view provides the option to edit the object or to delete (archive) the object. Regardless of choice, the table is refreshed to show any changes.
5. Add data aggregation
  * Once CRUD functionality is working, show some type of aggregated data. The aggregated data presented in this project shows the average number of miles coverage for all entered exercises.

### Phase Three
#### Learning Objectives
1. Configure an Angular application
2. Use:
  * Components
  * Services
  * Directives
  * Send / receive JSON
  * Send asynchronous request to Java controller with http

#### Step to Accomplish Learning Objectives
1. Add angular functionality. Configure application dependencies and set up the file structure.
2. Send asynchronous requests to the server using http.
3. Use the service and component TypeScript and HTML controller to display data.
4. Build Create/Read/Update/Delete functionality in the client.
5. Maintain display of aggregated data created in phase two.

### Project Success Measures
1. A new event object implements full CRUD.
2. All interactions with the database are done so RESTfully.
3. App uses angular to access data and manipulate the DOM.
4. App presents the aggregated data in some additional format.

### Expected Routes
Return Type | Route | Functionality
| :----: | :-----: | :-----:
|String  | GET api/ping | Returns pong
|List<ExerciseLog> | GET api/logs | Get all exercise logs
|ExerciseLog | GET api/logs{logId}| Gets one exercise log by id
|ExerciseLog | POST api/logs | Creates a new exercise log
|ExerciseLog | PUT api/logs/{logId} | Replaces an existing exercise log by id
|void | DELETE api/logs/{logId} | Sets the existing exercise log to disabled

### EC2 location
http://13.59.82.226:8080/ExerciseEvents/api/ping
  * Phase one the api routes listed in the Expected Routes table above can be manually navigated.
  * Phase two - a JavaScript front end was created and implemented making all Expected Routes functional.
  * Phase three - an Angular front end was created and implemented maintaining Expected Routes functionality.
