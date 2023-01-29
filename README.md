# event-driven news feed

REQUIREMENTS
- Node.js installed (https://nodejs.org/en/)

INSTALLATION

1) Install Angular CLI globally (https://angular.io/cli)

2) Install Nest.js CLI globally (https://docs.nestjs.com/cli/overview)

3) Open three terminal/command prompt sessions

4) 1st terminal session: 
  - go into working directory /newsfeed-frontend
  - run "npm install" to install dependencies
  - run "ng serve" to serve the Angular application
  
5) 2nd terminal session:
  - go into working directory /feed-microservice
  - run "npm install" to install dependencies
  - run "npm run start" to start the microservice
  - if terminal displays a mongoose error: try to connect via mobile network/hotspot 
        (the error occurs because some router configurations do not allow to conncect the remote database, MongoDB Atlas)

6) 3rd terminal session:
  - go into working directory /profile-microservice
  - run "npm install" to install dependencies
  - run "npm run start" to start the microservice
  - if terminal displays a mongoose error: try to connect via mobile network/hotspot 
        (the error occurs because some router configurations do not allow to conncect the remote database, MongoDB Atlas)
  
7) Visit localhost:4200 to display the application
  - optional: open new tabs to simulate multiple clients
  
CREDENTIALS
  - Username: 'henrik', Password: 'secret'
  - Username: 'test', Password: 'secret'
  - Username: 'production', Password: 'secret'

REFERENCE
Pictures by
https://dribbble.com/barnesdesign
https://pixabay.com/users/geralt-9301/
