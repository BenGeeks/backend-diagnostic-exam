1. run npm install

2. create .env and paste .env file data on the email

3. nodemon server

4. import Backend API Diagnostic Test.postman_collection.json to Postman

5. from postman, login using the sample payload

{
    "emailAddress": "iamgroot@groot.com",
    "password": "iamgroot!"
}

It is important to login first because a token will be provided on login

6. Create an account using the payload sample below. Please make sure to update the header with the login token

{
    "username": "iamgroot",
    "emailAddress": "iamgroot@guardiansofthegalaxy.com",
    "password": "iamgroot!",
    "access": "admin",
    "firstName": "Groot",
    "lastName": "I am",
    "phoneNumber": "+63 999 995 7176",
    "address": {
        "address1": "B19 L23 Sta. Rosa Hills",
        "address2": "Puting Kahoy",
        "city": "Silang",
        "province": "Cavite",
        "postCode": "4118"

    }
}

NOTE: username and emailaddress needs to be unique

7. Get the list of users using the Get All Users in Postman. Please make sure to update the header with the login token

8. Delete a user. Please make sure to update the header with the login token

when deleting a user, please make sure to put the user id in the request url
http://localhost:8080/user/63b71e69dfa9db5e1d51afba
sample is shown in Postman

9. Update a User. Please make sure to update the header with the login token

Only owners of the account can update their account
username and email cannot be updated
