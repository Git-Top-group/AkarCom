'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel = require("./users/users");
const notifyModel =require('./orders/notify')
const ordersModel = require("./orders/orders");
const messagesModel = require("./orders/messages");
const housesModel = require("./houses/houses");
const houseImagesModel = require("./houses/imgHouses");

const apartmentsModel = require("./apartments/apartment");
const apartmentImagesModel = require("./apartments/imgApartment");

const chaletsModel = require("./chalets/chalets");
const chaletImagesModel = require("./chalets/imgChalets");

const landsModel = require("./lands/lands");
const landImagesModel = require("./lands/imgLands");

const villasModel = require("./villas/villas");
const villaImagesModel = require("./villas/imgVillas");

const warehousesModel = require("./warehouses/warehouses");
const warehouseImagesModel = require("./warehouses/imgWarehouses");

const Collection = require("./collection");
const ImageCollection = require("./imagesCollection")
const OrderCollection = require("./orderCollection")
const notificationsCollection =require("./notificationsCollection")

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: { require: true, rejectUnauthorized: false }
            },
        }
        : {};
        
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const users = userModel(sequelize, DataTypes);
const houses = housesModel(sequelize, DataTypes);
const apartments = apartmentsModel(sequelize, DataTypes);
const chalets = chaletsModel(sequelize, DataTypes);
const lands = landsModel(sequelize, DataTypes);
const villas = villasModel(sequelize, DataTypes);
const warehouses = warehousesModel(sequelize, DataTypes);


const houseImages = houseImagesModel(sequelize, DataTypes);
const apartmentImages = apartmentImagesModel(sequelize, DataTypes);
const chaletImages = chaletImagesModel(sequelize, DataTypes);
const landImages = landImagesModel(sequelize, DataTypes);
const villaImages = villaImagesModel(sequelize, DataTypes);
const warehouseImages = warehouseImagesModel(sequelize, DataTypes);
const notifications =notifyModel(sequelize, DataTypes);
const orders = ordersModel(sequelize, DataTypes);
const messages = messagesModel(sequelize, DataTypes);

//1-M relationship between users and real estates categories
users.hasMany(houses, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

houses.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(apartments, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

apartments.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(chalets, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

chalets.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(lands, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

lands.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(villas, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

villas.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(warehouses, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

warehouses.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});


//1-M relationships between real estates and their images

houses.hasOne(houseImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

houseImages.belongsTo(houses, {
    foreignKey: "postId",
    targetKey: "id",
});

apartments.hasOne(apartmentImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

apartmentImages.belongsTo(apartments, {
    foreignKey: "postId",
    targetKey: "id",
});

chalets.hasOne(chaletImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

chaletImages.belongsTo(chalets, {
    foreignKey: "postId",
    targetKey: "id",
});

lands.hasOne(landImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

landImages.belongsTo(lands, {
    foreignKey: "postId",
    targetKey: "id",
});

villas.hasOne(villaImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

villaImages.belongsTo(villas, {
    foreignKey: "postId",
    targetKey: "id",
});

warehouses.hasOne(warehouseImages, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});

warehouseImages.belongsTo(warehouses, {
    foreignKey: "postId",
    targetKey: "id",
});


//1-M relationship between users and orders:
users.hasMany(orders, {
    foreignKey: "clientId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(users, {
    foreignKey: "clientId",
    targetKey: "id",
});

users.hasMany(notifications, {
    foreignKey: "clientId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(users, {
    foreignKey: "clientId",
    targetKey: "id",
});

users.hasMany(messages, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
})
messages.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});
//1-M relationship between real estate and orders:
lands.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(lands, {
    foreignKey: "postId",
    targetKey: "id",
});
villas.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(villas, {
    foreignKey: "postId",
    targetKey: "id",
});
houses.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(houses, {
    foreignKey: "postId",
    targetKey: "id",
});
apartments.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(apartments, {
    foreignKey: "postId",
    targetKey: "id",
});
chalets.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(chalets, {
    foreignKey: "postId",
    targetKey: "id",
});
warehouses.hasMany(orders, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
orders.belongsTo(warehouses, {
    foreignKey: "postId",
    targetKey: "id",
});

lands.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(lands, {
    foreignKey: "postId",
    targetKey: "id",
});
villas.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(villas, {
    foreignKey: "postId",
    targetKey: "id",
});
houses.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(houses, {
    foreignKey: "postId",
    targetKey: "id",
});
apartments.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(apartments, {
    foreignKey: "postId",
    targetKey: "id",
});
chalets.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(chalets, {
    foreignKey: "postId",
    targetKey: "id",
});
warehouses.hasMany(notifications, {
    foreignKey: "postId",
    sourceKey: "id",
    onDelete:'cascade'
});
notifications.belongsTo(warehouses, {
    foreignKey: "postId",
    targetKey: "id",
});

module.exports = {
    sequelize: sequelize,
    DataTypes: DataTypes,
    houses: new Collection(houses),
    apartments: new Collection(apartments),
    chalets: new Collection(chalets),
    lands: new Collection(lands),
    villas: new Collection(villas),
    warehouses: new Collection(warehouses),

    users: users,

    houseImages: new ImageCollection(houseImages),
    apartmentImages: new ImageCollection(apartmentImages),
    chaletImages: new ImageCollection(chaletImages),
    landImages: new ImageCollection(landImages),
    villaImages: new ImageCollection(villaImages),
    warehouseImages: new ImageCollection(warehouseImages),
    notifications :new notificationsCollection(notifications),
    orders: new OrderCollection(orders),
    messages: new OrderCollection(messages),
}; 