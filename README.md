# eBusiness Project Group 1: One-Time Two-Factor Authentication

## Contriubtors 
- Liam Collins
- Jamison Engels
- Amy Pierce 
- Ciara O'Sullivan
## Use Master Branch for Most Recent Build
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
- [node.js] (https://nodejs.org/en/download/)
#### Dependencies
- once npm i is run all dependencies dhould be installed needed to run the project
- if any aditional installations are required they can be found - [here] (https://www.npmjs.com/package/package)



### Usage
Within your project's directory 
```
cd into online shop
npm i (to install dependencies)
npm start (to run)
```

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
|    xxxxxxxxx | Luke      | Feely     |
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
####

MIT License 
Copyright 2019 Liam Collins, Jamison Engels, Amy Pierce, Ciara O'Sullivan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
