# eBusiness CSU33BC1 Project Group 1: One-Time Two-Factor Authentication

## Contriubtors 
- Liam Collins 17301097
- Jamison Engels 17300599
- Amy Pierce 17330305
- Ciara O'Sullivan 17321934

## Use Master Branch for Most Recent Build

## About this project
Our goal was to develop a program where a user can login without entering their full password. Instead, the user enters only part of their password, for example, they could be asked to enter the 3rd, 6th, and 7th characters of their predefined password. This method is more secure as even if a hacker phished this information, they will not know the entire password. They will also be sent an OTP by text. This must be entered into the website and verified in order to gain access to the account. This provides additional security by checking if the user has knowledge beyond access to the phone, and all the benefits of two-factor authentication.

## [Video of our prototype](https://www.youtube.com/watch?v=TT4H4aYJW3A&feature=youtu.be)

## [Site Demo](https://ebusiness-project.herokuapp.com/)

## To Run Locally - Short Explanation
- First read each header before to understand how each part of project work
- Obtain Twillio credentials 
- Setup Otp-Service and configure Micronaut to run your microservice locally 
```
./gradlew run
```
- Setup frontend and fill in all API calls to the backend with your localhost
```
npm i 
npm update 
```
- Setup and configure database and configure your frontend database calls
```
npm install -g xmysql
xmysql -h localhost -u mysqlUsername -p mysqlPassword -d databaseName
```
- Spin out the all of these programs at the same time and run to start your website
```
npm start
```

## To Deploy - Short Explanation
- [Learn how to deploy a microservice to Google cloud](https://codelabs.developers.google.com/codelabs/cloud-micronaut-kubernetes/index.html?index=..%2F..index#9)
- [Learn how to setup a website with Heroku](https://dashboard.heroku.com/apps)

## Known Issues
- When deploying to Google cloud, many browsers do not like the SSL signature that Micronaut creates and will not allow the frontend to communicate with our backend microservices. To circumvent this take the IP of your microservice, place it into browsers, and click "Advance" to allow your browser to trust the given IP. If you need more help, check out this [link](https://www.techrepublic.com/article/how-to-add-a-trusted-certificate-authority-certificate-to-chrome-and-firefox/)

## Otp-Service

### Requirments 
- [Java 1.8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 
- [Micronaut](https://micronaut.io/download.html) 
- IDE i.e. [Intellij](https://www.jetbrains.com/idea/)
- [Lombok](https://projectlombok.org/)
- Gradle/Maven
- [Twilio Verify Credentials](https://www.twilio.com/docs/verify)

Notes:
This project relies heavily on Micronaut to create microservices and the usage of Twilio to send and verifies OTP codes. Before going further please feel very comfortable with both of these systems. 

This project uses simple authentication that uses a username and password to access the API. This can be configured within the ```AuthenticationProviderUserPassword``` class

This service is a demo and should not be used for any real websites. A lot of information is sent via bodies in POST requests in a HTTP service without SSL encryption. SSL encryption can be configured within the Micronaut.yaml file

### Endpoints

#### /Otp
```
POST /Otp/send 
```
##### Summary
- Sends an otp code to the phone number starting with "+" and an area code given in a json format

##### Parameters
- String phoneNumber within the body ``` {"phoneNumber": "+353XXXXXXXXXX"} ```

##### Returns 
- Returns a response formatted from Twilio
```
{
    "service_sid": "",
    "account_sid": "",
    "to": "+353XXXXXXXXXX",
    "status": "pending",
    "valid": "false"
}
```
- In an error case, Twilio will return a formatted error
```
{
    "errorMessage": "com.twilio.exception.ApiException:"
}
```


```
POST /Otp/verify
```
##### Summary
- Verifies an otp code with a validily formatted phonenumber ("+" and area code") 

##### Parameters
- String phoneNumber, String code within the body ``` {"phoneNumber": "+353XXXXXXXXXX", "code": "XXXX"} ```

##### Returns 
- Returns a response formatted from Twilio, the "status" tag will indicate whether or not the code was verified
```
{
    "sid": "",
    "service_sid": "",
    "account_sid": "",
    "phoneNumber": "+353XXXXXXXXXX",
    "status": "approved",
    "valid": "true"
}
```
- In an error case, Twilio will return a formatted error
```
{
    "errorMessage": "com.twilio.exception.ApiException:"
}
```
#### /Validate
```
Post /validate/generatePartialPassword
```
##### Summary
- Checks whether a given username exists in the database, if that user exists, their phonenumber is returned
- Notes: Our systems gives the indexs of the partial password, not the actual password text 
    (i.e. partial password "134" of "Trinity" would be "rni") 

##### Parameters
- String userName within the header 

##### Returns 
- Returns the username and the corresponding partial password indexes 
```
{
    "userName": "liam",
    "indexes": "351"
}
```
- In an error case, an error message is returned that shows whether the user or the password was no found
```
{
    "errorMessage": 
}
```


```
GET /validate/getUserPhoneNumber
```
##### Summary
- Generates a partial password from a given username and returns the indexs of the partial password
##### Parameters
- String userName within the body ``` {"userName": "liam"} ```

##### Returns 
- Returns the phonenumber that corresponds to that username
```
+353XXXXXXXXXX
```
- In an error case, an error message is returned that will show id the user is invalid or if the phonenumber is empty
```
{
    "errorMessage": 
}
```


```
POST /validate/verifyPartialPassword
```
##### Summary
- Verifies whether or not a given partial password, its indexes, and the username all match
##### Parameters
- String userName, String partialPassword, String indexes within the body 
``` {"userName":"liam","partialPassword":"21S","indexes":"351"} ```

##### Returns 
- Returns the true a boolean that shows whether or not the partial password was correctly matched to the password
```
Valid: "true"
```
- In an error case, that shows if the user or the password does not exist
```
{
    "errorMessage": 
}
```


```
POST /validate/login
```
##### Summary
- Logs a user in based on a given username and password 
##### Parameters
- String userName, String partialPassword
``` {"userName":"liam","password:"XXXX"} ```

##### Returns 
- Returns the true a boolean that shows whether or not username and password match the values within the database
```Valid: "true" ```

- In an error case, that shows if the user or the password does not exist
```
{
    "errorMessage": 
}
```

### Usage
Within your project's directory 
```
./gradlew run 
```
## Frontend

### Requirments
- [node.js](https://nodejs.org/en/download/)

#### Dependencies
- once npm i is run all dependencies dhould be installed needed to run the project
- if any aditional installations are required they can be found [here](https://www.npmjs.com/package/package)
### Usage
Within your project's directory 
```
cd into online shop
npm i (to install dependencies)
npm update (to get the releveant version of npm)
npm start (to run)
```
### [Giorgi-m's online-shop](https://github.com/giorgi-m)
-for this project we decided to intergrate our login feature into an already developed react.js application. We used a online-shop application that can be gound on [giorgi-m's](https://github.com/giorgi-m/online-shop?fbclid=IwAR3LIAWiNSmhDrND2gkn0J8DgDUS9wG8azRLAf46fqVd29fSMTXhUK1Ezx0) github.
- We decided it would be most interesting to show how our one time two factor authentication app is fully functional and easily intergrated into real websites.
-[Giorgi-m's](https://github.com/giorgi-m) application that we took from github we decided to use offered us teh perfect way to show off the functionality of our feature. 
-The login and registration functioanlity was created by ourselves and worked into the already created react.js app but It would also be possible to remove it from the online-shop app and still be a fully functional react.js application with minor and easy changes

## Database

### Requirments
- [MySQL Community Server 8.0](https://dev.mysql.com/downloads/mysql/) 
- [xmysql](https://github.com/o1lab/xmysql) 
- Optional IDE i.e. [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- [Node 12.0](https://nodejs.org/en/)

Note: These are the guidelines for creating a MySQL server and REST API for the interfacing between the service and frontend described above. Familiarity with database concepts is a must. Please note that this description does not include encryption and should not be used as is in a live site. Also be aware that the tables/models used here can be changed as long as teh rest of the program is changed to reflect this. 

### Usage
#### MySQL
##### Table Creation
MySQL log in is:
```
shell>mysql -u username -p
```
will launch the MySQL shell program, where tables can be edited and created. In workbench, one just has to start the program, log in, and click create table (within model detail screen).
In workbench, add a table to a model, making sure to assign an approiate Primary Key. The suggested primary key is the phone number in this case. 
In command line, to create a table the command is:
```
mysql>CREATE TABLE tablename(
userName            VARCHAR(25) NOT NULL,
password            VARCHAR(25) NOT NULL,
phoneNumber         VARCHAR(25) NOT NULL,
PRIMARY KEY (phoneNumber)
)
```
The rows of the table can be changed to fit your own database needs. Be sure to follow safe database management guidelines.
And to populate:
```
mysql>INSERT INTO tablename(column1,column2,column*) VALUES
(item1col1,item1col2,item1col3),
(item2col1,item2col2,item2col3);
```
##### MySQL Access
SQL Queiries can be used to retrieve data from the tabel.
For example, to retrieve all entries:
```
mysql>SELECT * FROM tablename;
```
will generate an output like:
```
+--------------+-----------+-----------+
| Phone Number | User Name | Password  |
+--------------+-----------+-----------+
|    xxxxxxxxx | Liam      | Password  |
|    xxxxxxxxx | Amy       | Computers |
|    xxxxxxxxx | Ciara     | BeepBoop  |
|    xxxxxxxxx | Jack      | SWENG1    |
+--------------+-----------+-----------+
4 rows in set (0.01 sec)
```

#### xmysql & REST
##### Installation
Install with node package in command line
```
npm install -g xmysql
```
May need to add xmysql to your systems PATH enviroment variables
##### Usage 
To start the xmysql and generate the API files
```
xmysql -h localhost -u mysqlUsername -p mysqlPassword -d databaseName
```
##### Return
Will create an output like:
```
          Generating REST APIs at the speed of your thought..

 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

          Database              :    Users
          Number of Tables      :    1

          REST APIs Generated   :    28

          Xmysql took           :    0.1 seconds
          API's base URL        :    localhost:3000

 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
This output means the API's have generated approtiatly. There are many commands that can be accessed via https://github.com/o1lab/xmysql
The strength of xmysql is that it generates all the applicable REST API's one can use on the selected database. 

### Database on local host
We were able to connect our app to the database we created over local host using the 'fetch' command in the front
### Requirements
mySQL workbench
### Usage
#### Database setup
- assuming you have the required [MySQL Community Server 8.0](https://dev.mysql.com/downloads/mysql/) installed, you can set up a data base with the following schema
```
CREATE TABLE `simple-react-sql-db`.`accounts` (
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

```
- you will then have to open the user-server file and change the connection to match your database
```
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<your sql password>',
    database: '<your databse name>'
});

```

- a separate terminal must be opened and in your project directory
```
cd into user-server
nodemon
```
you can then go to localhost:4000/users to view the json of the database returned from SQL query
```
'SELECT * FROM accounts'
```

#### Add User
- to register a user (email=student@tcd.ie,password=Trinity, phone number=123456789) and add them to the data base:
```
fetch('http://localhost:4000/users/add?email=' + user.email + '&password=' + user.password + '&phone_number=' + user.phone_number)

```
This then connects with  server and  sends an SQL query
```
'INSERT INTO accounts (email,password,phone_number) VALUES(email,password,phone_number)'
```
and the user is successfully added to the database 
#### Find User (Assuming user exists with credentials: (email=student@tcd.ie,password=Trinity, phone number=123456789))

- to find student@tcd.ie in the database and get their password and phone number:
```
fetch('http://localhost:4000/users/find?email=email')

```
This then connects with server and sends an SQL query
```
 'SELECT password,phone_number FROM accounts WHERE email=email'
```
and a json will be returned containing that users password(Trinity) and phone number (123456789) 


####

MIT License 
Copyright 2019 Liam Collins, Jamison Engels, Amy Pierce, Ciara O'Sullivan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
