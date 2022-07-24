'use strict';

const PORT = process.env.PORT || 3000;
const express = require("express");


const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger");
const authRouter = require("./auth/routes")

const app = express();

app.use(logger);

app.get('/', (req, res) => {
    res.send('this is the home page')
  })

  app.use(authRouter);


app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};


