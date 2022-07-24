'use strict';

const PORT = process.env.PORT || 3000;
const express = require("express");


const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger");
const authRouter = require("./auth/routes");
const routers = require("./routes/router")

const app = express();
app.use(express.json());

app.use(logger);
app.get('/', (req, res) => {
    res.send('this is the home page')
  })

app.use(authRouter);
app.use(routers);
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


