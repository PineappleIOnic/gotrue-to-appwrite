require('dotenv').config();

let { Client, Account } = require('appwrite');

const client = new Client();

const account = new Account(client);

client
    .setEndpoint(process.env["APPWRITE_ENDPOINT"]) // Your API Endpoint
    .setProject(process.env["APPWRITE_PROJECT_ID"]) // Your project ID
;

const promise = account.createEmailSession('testemail@testemail.com', 'passwordpassword');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});