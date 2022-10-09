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
const notificationsRouter =require("./routes/notificationsRouter")

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

const admin = io.of('/admin');

io.on('connection', (socket) => {
    console.log('Server connected to socketio server ', socket.id);
    socket.on('new-order', (payload) => { //(2)
        console.log({ payload });
        io.emit('adminNewOrder', (payload)) //(3)
        socket.on("admin-response-after-new-order",(payload)=>{   //(6)
            io.emit('client-response', (payload)) //(7)
        })
        socket.on("admin-to-owner",(payload)=>{   //(10)
            io.emit('admin-to-owner-public', (payload)) //(11)
        })
        socket.on("owner-to-admin",(payload)=>{   //(14-a)
            io.emit('owner-to-admin-public', (payload)) //(15-a)
        })
        socket.on("owner-to-admin-reject",(payload)=>{   //(14-b)
            io.emit('owner-to-admin-reject-public', (payload)) //(15-b)
        })

        socket.on("admin-to-client-meet",(payload)=>{   //(18-a)
            io.emit('admin-to-client-meet-public', (payload)) //(19-a)
        })
        socket.on("client-to-admin",(payload)=>{   //(22-a-1)
            io.emit('client-to-admin-public', (payload)) //(23-a-1)
        })
        socket.on("client-to-admin-reject",(payload)=>{   //(22-a-2)
            io.emit('client-to-admin-reject-public', (payload)) //(23-a-2)
        })
    });
  });

app.use(logger);
app.get('/', (req, res) => {
    res.send('welcome to AkarCom home page 🛕⛪🏰🏯⛺🌉')
})

app.use(authRouter);
app.use(ordersRouter);
app.use(adminRouters);
app.use(routers);
app.use(visitorRouters);
app.use(notificationsRouter);


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


