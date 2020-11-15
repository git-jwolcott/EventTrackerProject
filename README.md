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

### Expected Routes
Return Type | Route | Functionality
| :----:  :-----: :-----:
|String  | GET api/ping | Returns pong
|List<ExerciseLog> | GET api/logs | Get all exercise logs
|ExerciseLog | GET api/logs{logId}| Gets one exercise log by id
|ExerciseLog | POST api/logs | Creates a new exercise log
|ExerciseLog | PUT api/logs/{logId} | Replaces an existing exercise log by id
|void DELETE | api/logs/{logId} | Sets the existing exercise log to disabled

### EC2 location
http://13.59.82.226:8080/ExerciseEvents/api/ping <only page currently working until phase two is completed
