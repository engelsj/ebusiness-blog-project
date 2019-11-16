# eBusiness Project Group 1: One-Time Two-Factor Authentication

## Contriubtors 
- Liam Collins
- Jamison Engels
- Amy Pierce 
- Ciara O'Sullivan

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

### Usage

## Database

### Requirments

### Usage

