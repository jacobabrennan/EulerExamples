# EulerExamples
A collection of Project Euler answers. This project includes
* A Node.js server
* An AngularJS powered client

## Prerequisites
You will need Node.js in order to run the server locally.
Alternately, you can view a demo running at http://JacobABrennan.com/oiler

## Getting Started
First, install the server and run the tests
```
// Clone the repo locally
git clone https://github.com/jacobabrennan/EulerExamples.git

// Move to the project directory
cd EulerExamples

// Install the package and dependencies using NPM
npm install

// Start the server, tests will be run automatically
node app.js

// Alternately, you can run the tests without starting the server.
npm test
```
The server will open on port 8080 by default. You can change this by editing line 2 of app.js

Once the server is running, open your browser and navigate to http://localhost:8080 (or whatever port you specified).
Using the number input, you should be able to view question text, answers, and solution strategies for Project Euler questions 1 through 5, and any others I may add in the future.