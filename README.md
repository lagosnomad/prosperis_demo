# Prosperis Customer REST API

- Auth Resource – This will handle endpoints for authentication which will include, login, signup etc
- Customer Resource – This will handle CRUD endpoints for managing a customer. All endpoints in this resource will only be accessed by an authenticated and authorized user.
  The project will persist data to a mongodb database. This database is already configured in the project.

## Setup

- Pull the assessment repo
  - `git clone https://github.com/lagosnomad/prosperis_demo.git`
- Pull up your favorite console and change to this directory
- Install the projects dependencies
  - `npm install`
- Startup the server
  - `nodemon` or `npm start`
- To build the project
  - `npm run build`
- To continuously watch for changes
  - `npm run watch`

## Documentation - Bonus

I created a documentation for this REST API and it can be found [here on Postman documenter](https://documenter.getpostman.com/view/8280535/SW7W5VBK)

## Tools

- NodeJs
- ExpressJs
- MongoDB as a service ([Mlab](https://mlab.com))
- VSCode
- Postman
- Postman Documenter
