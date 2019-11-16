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

### Endpoints

#### /Otp
```
POST /Otp/send 
```
##### Summary
- Sends an otp code to the phone number starting with "+" and an area code given in a json format

##### Parameters
- String phoneNumber ``` {"phoneNumber": "+353XXXXXXXXXX"} ```

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
- String phoneNumber, String code ``` {"phoneNumber": "+353XXXXXXXXXX", "code": "XXXX"} ```

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
GET /validate/user
```

```
POST /validate/generatePartialPassword
```
```
POST /validate/verifyPartialPassword
```
```
POST /validate/login
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

