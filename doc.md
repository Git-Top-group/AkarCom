# ![cf](https://avatars.githubusercontent.com/u/109529854?s=96&v=4) sooqcom

## _Group-3, mid-project_

[GitHub](https://github.com/Git-Top-group/SooqCom/tree/staging)

<!-- [Heroku](https://mid-project-01.herokuapp.com/) not ready -->

 
# Fashionable 

## ✨Team members✨

- mohammad alshraideh  (Team Leader).
- Esam-Ankir.

- Hadeel Saleh .
- MohammedAlDahleh
.
- islam rwashdeh .


---

## Configuration

Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.

-   **README.md** - contains documentation
-   **.env** - contains env variables (should be git ignored)
-   **.gitignore** - contains a  `.gitignore` file
<!-- -   **.eslintrc** - contains the course linter configuratoin -->
<!-- -   **.eslintignore** - contains the course linter ignore configuration -->
-   **package.json** - contains npm package config
    -   create a `test` script for running tests
    -   create a `start` script for running your server
-   **index.js** - the entry point for your application
-   **src/** - contains your core application files and folders
-   **\_\_test\_\_/** - contains unit tests

---

## Authrization

- Visitor  - READ

-   User - READ/CREATE/UPDATE/DELETE (limmeted)

-   Admin - READ/CREATE/UPDATE/DELETE 

---

## Dependencies

-   base-64

-   bcrypt

-   cors

-   dotenv

-   express

-   jest

-   jsonwebtoken

-   pg

-   supertest

-   sequelize

-   http


-   socket.io

-   socket.io-client

-   uuid

---

## Auth Routes

| method      |                      link           |   Description            |
| ----------- | ------------------------------------|--------------------------|
|    POST     |  /signup                           | Signup       |
|    POST     |  /signin                           |     Signin    |
|    GET   |   /signout                         |      to signout|


## Visitor  Routes

| method      |                    link   |   Description                        |
| ----------- | --------------------------|--------------------------------------|
|    GET     |  /:model               |    Get specific model  posts|
|    GET      |  /:model/:postId           |    Get specific posts  |
|    GET      |  /:model/:postId/:modelImages                |    Get specific post images         |
|  POST    |   /hi/search/:model/:term'       |   search about specific thing       |
|  GET     |  /:model/:process/:city/:owner/:availability/:buildingAge/:furnished/:rooms/:bathRooms/:rentDuration/:floors/:priceFrom/:priceTo             |  Filter one or more at the same time (visitor)            |


## Users  Routes

| method      |                    link   |   Description                        |
| ----------- | --------------------------|--------------------------------------|
|    GET     |         /dashboard/:userId/main      |    Open user dashboard |
|    GET      |  /dashboard/:userId/:model          |   Get all posts related with specific modle  |
|    GET      | /dashboard/:userId/:model/:postId               |    Get specifi  posts from  specifi  modle     |
|  GET |  /dashboard/:userId/:model/:postId/:modelImages         |  Get specific post images        |
|  POST     |  /newpost/:userId/:model            | Create posts       |
|  POST      | /newpost/:userId/:model/:postId/:modelImages   |  Create post images          |
|GET       |  /dashboard/:userId/:model/:postId             |  open specific post in user dashboard           |
|PUT| /dashboard/:userId/:model/:postId       |  Update post from dashboard         |
|PUT|  /dashboard/:userId/:model/:postId/:modelImages         |  Update post images from dsashboard       |
|DELETE |  /dashboard/:userId/:model/:postId             | Delete posts  from dashboard         |
|DELETE |  /dashboard/:userId/:model/:postId/:modelImages          | Delete posts images from dashboard         |
|GET |   /user/profile/:userId         |  Open users personal profile       |

## Admin Routes

| method      |                    link   |   Description                        |
| ----------- | --------------------------|--------------------------------------|
|   POST    |  admin/signin           |   sign in for admin    |
| GET       | /users        |  Get all users for admin        |
|    PUT     |   /user/profile/:id/update                       |    Update user recored |
|  DELETE    |   /delete/:username         | Delete user         |
|   DELETE|  /:model/:userId/:postId          |  Delete any post for any user          |



## Order Routes

| method      |                    link   |   Description                        |
| ----------- | --------------------------|--------------------------------------|
|    POST     |  /:model/:postId/neworder           |    Create new Order  |
|    GET      |   /allorders           |    Get all Order   |
|    GET      |  /allorders/:postId"             |    Get specific post orders          |
|  GET   |  /allorders/:postId/:orderId           |   Get specific order on specific post        |
|  POST     |  /allorders/:postId/:orderId/:action        |  send a message to owner            |
|     GET   |  /myorders/:userId      | enable user to see all his/her orders       |
|     GET   |  /myorders/:userId/:orderId     |enable  user to see specific order       |
|     GET   |  /myorders/:userId/:orderId/status    |  check  ordar status
|     GET   |  /checkmeet    |  admin can check if the owner accept the order or not      |
|     GET   |  /myorders/:userId/:orderId/status/date  |   client can check meeting date  |


## UML

 ![UML](Images/UML.jpg)

##  ER diagram

 ![Database_Diagram](Images/er.jpg)


## Installation

 Sooqcom requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd Sooqcom
npm i
npm start
```

For production environments...

```sh
npm install --production
NODE_ENV=production node index
```

## License

MIT

**Free Software, Hell Yeah!**