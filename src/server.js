'use strict';
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const cors = require('cors')
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger");
const authRouter = require("./auth/authRoutes");
const routers = require("./routes/router")
const adminRouters = require("./routes/adminRoutes")
const visitorRouters = require("./routes/visitorRoutes")
const ordersRouter =require("./routes/ordersRouter")
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Server connected to socketio server ', socket.id);
    socket.on('new-order', (payload) => { //(2)
        console.log({ payload });
        io.emit('adminNewOrder', (payload)) //(3)
        socket.on("rejectOrder",(payload)=>{   //(6-b)
            console.log("!!!!!!!!!!!!!1111111111111")
            io.emit('clientReject', (payload)) //(7-b)

        })

    });
});

app.use(logger);
app.get('/', (req, res) => {
    res.send('this is the home page')
})

app.use(authRouter);
app.use(ordersRouter);
app.use(adminRouters);
app.use(routers);
app.use(visitorRouters);
app.use(cookieParser());


app.use("*", notFoundHandler);
app.use(errorHandler);

function start(PORT) {
    server.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}


module.exports = {
    app: app,
    start: start,
};


