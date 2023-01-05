1. run npm install

2. create .env and paste the file below

ACCESS_TOKEN_SECRET=89c226cf5ee75190f51fce62dd1cf13103a620ff8e9ec5ad9a53bab4be9997fe0866001e33c73bdb3fd4f562b90e2e741b19c65a94ad45288f95e0b50a614b5f
ATLAS_URI=mongodb+srv://m001-student:PPfofIJM2Tib5Yp5@sandbox.javja.mongodb.net/backend?retryWrites=true&w=majority
JWT_KEY= 7916ec50441929454826426cf22f26ee157dcaed3cbd1aa3a6c20328413b5f5d

3. nodemon server

4. import Backend API Diagnostic Test.postman_collection.json to Postman

5. from postman, login using the sample payload

{
    "emailAddress": "iamgroot@groot.com",
    "password": "iamgroot!"
}

6. Create an account using the payload sample below

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

7. Get the list of users using the Get All Users in Postman

8. Delete a user

when deleting a user, please make sure to put the user id in the request url
http://localhost:8080/user/63b71e69dfa9db5e1d51afba
sample is shown in Postman

9. Update a User

Only owners of the account can update their account
username and email cannot be updated
