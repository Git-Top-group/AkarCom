'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel = require("./users/users");

const ordersModel =require("./orders/orders");  

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

const orders = ordersModel(sequelize, DataTypes);


//1-M relationship between users and real estates categories
users.hasMany(houses, {
    foreignKey: "userId",
    sourceKey: "id"
});

houses.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(apartments, {
    foreignKey: "userId",
    sourceKey: "id"
});

apartments.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(chalets, {
    foreignKey: "userId",
    sourceKey: "id"
});

chalets.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(lands, {
    foreignKey: "userId",
    sourceKey: "id"
});

lands.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(villas, {
    foreignKey: "userId",
    sourceKey: "id"
});

villas.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

users.hasMany(warehouses, {
    foreignKey: "userId",
    sourceKey: "id"
});

warehouses.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});


//1-M relationships between real estates and their images

houses.hasOne(houseImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

houseImages.belongsTo(houses, {
    foreignKey: "postId",
    targetKey: "id",
});

apartments.hasOne(apartmentImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

apartmentImages.belongsTo(apartments, {
    foreignKey: "postId",
    targetKey: "id",
});

chalets.hasOne(chaletImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

chaletImages.belongsTo(chalets, {
    foreignKey: "postId",
    targetKey: "id",
});

lands.hasOne(landImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

landImages.belongsTo(lands, {
    foreignKey: "postId",
    targetKey: "id",
});

villas.hasOne(villaImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

villaImages.belongsTo(villas, {
    foreignKey: "postId",
    targetKey: "id",
});

warehouses.hasOne(warehouseImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

warehouseImages.belongsTo(warehouses, {
    foreignKey: "postId",
    targetKey: "id",
});


//1-M relationship between users and orders:
users.hasMany(orders, {
    foreignKey: "clientId",
    sourceKey: "id",
});
orders.belongsTo(users, {
    foreignKey: "clientId",
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

    houseImages: new Collection(houseImages),
    apartmentImages: new Collection(apartmentImages),
    chaletImages: new Collection(chaletImages),
    landImages: new Collection(landImages),
    villaImages: new Collection(villaImages),
    warehouseImages: new Collection(warehouseImages),

    orders: orders,

}; 