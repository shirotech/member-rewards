# Member Rewards

This is a demo app to demonstrate a very simple API that allows to:

* Creating a member and reward
* Associate a reward to a member
* Retrieve a member and their rewards
* Delete a member and reward

## Software requirements

### PostgreSQL

* Use latest PostgreSQL, currently on `9.6.2`

### Node.js

* Optional to use `nvm`, it is really good for managing your `node` versions, for details please refer to [Managing your Node.js versions](https://shirotech.com/node-js/managing-your-node-js-versions).
* If not using `nvm`, node `6.0.0` is minimum.

## Installation instructions

1. If using `nvm`, `cd` to project root directory and run `nvm install` the intended version for this project, then run `nvm use` to change to the right version.
2. `npm run db:create:dev` which will create the database and user.
3. `npm start` which will create the tables, install npm packages and run the server.
4. `npm test` will run the unit tests.
5. Use the [Postman collection](member-rewards.postman_collection.json) to help with manual testing

## Assumptions

1. When creating a reward, member can be anonymous or logged-in / known

## Out of scope

1. Authentication would be good for security, otherwise the API is allowing consumer to do too much without restrictions.
2. Caching using Redis would be handy to reduce the load on the database server.