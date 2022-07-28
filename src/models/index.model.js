'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel = require("./users/users");

const ordersModel =require("./orders/orders");  

const housesModel = require("./houses/houses");
const houseImagesModel = require("./houses/imgHouses");
// const houseOrdersModel =require("./houses/houseOrders");

const apartmentsModel = require("./apartments/apartment");
const apartmentImagesModel = require("./apartments/imgApartment");
// const apartmentOrdersModel =require("./apartments/apartmentOrders");

const chaletsModel = require("./chalets/chalets");
const chaletImagesModel = require("./chalets/imgChalets");
// const chaletOrdersModel =require("./chalets/chaletOrders");

const landsModel = require("./lands/lands");
const landImagesModel = require("./lands/imgLands");
// const landOrdersModel=require("./lands/landOrders");


const villasModel = require("./villas/villas");
const villaImagesModel = require("./villas/imgVillas");
// const villaOrdersModel=require("./villas/villaOrders");

const warehousesModel = require("./warehouses/warehouses");
const warehouseImagesModel = require("./warehouses/imgWarehouses");
// const warehouseOrdersModel=require("./warehouses/warehouseOrders");

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

// const houseOrders = houseOrdersModel(sequelize, DataTypes);
// const apartmentOrders = apartmentOrdersModel(sequelize, DataTypes);
// const chaletOrders = chaletOrdersModel(sequelize, DataTypes);
// const landOrders = landOrdersModel(sequelize, DataTypes);
// const villaOrders = villaOrdersModel(sequelize, DataTypes);
// const warehouseOrders = warehouseOrdersModel(sequelize, DataTypes);


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

houses.hasMany(houseImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

houseImages.belongsTo(houses, {
    foreignKey: "postId",
    targetKey: "id",
});

apartments.hasMany(apartmentImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

apartmentImages.belongsTo(apartments, {
    foreignKey: "postId",
    targetKey: "id",
});

chalets.hasMany(chaletImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

chaletImages.belongsTo(chalets, {
    foreignKey: "postId",
    targetKey: "id",
});

lands.hasMany(landImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

landImages.belongsTo(lands, {
    foreignKey: "postId",
    targetKey: "id",
});

villas.hasMany(villaImages, {
    foreignKey: "postId",
    sourceKey: "id"
});

villaImages.belongsTo(villas, {
    foreignKey: "postId",
    targetKey: "id",
});

warehouses.hasMany(warehouseImages, {
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
// houses.hasMany(houseOrders, {
//     foreignKey: "postId",
//     sourceKey: "id",
// });
// houseOrders.belongsTo(houses, {
//     foreignKey: "postId",
//     targetKey: "id",
// });
// apartments.hasMany(apartmentOrders, {
//     foreignKey: "postId",
//     sourceKey: "id"
// });
// apartmentOrders.belongsTo(apartments, {
//     foreignKey: "postId",
//     targetKey: "id",
// });
// chalets.hasMany(chaletOrders, {
//     foreignKey: "postId",
//     sourceKey: "id"
// });
// chaletOrders.belongsTo(chalets, {
//     foreignKey: "postId",
//     targetKey: "id",
// });
// lands.hasMany(landOrders, {
//     foreignKey: "postId",
//     sourceKey: "id"
// });
// landOrders.belongsTo(lands, {
//     foreignKey: "postId",
//     targetKey: "id",
// });
// villas.hasMany(villaOrders, {
//     foreignKey: "postId",
//     sourceKey: "id"
// });
// villaOrders.belongsTo(villas, {
//     foreignKey: "postId",
//     targetKey: "id",
// });
// warehouses.hasMany(warehouseOrders, {
//     foreignKey: "postId",
//     sourceKey: "id"
// });
// warehouseOrders.belongsTo(warehouses, {
//     foreignKey: "postId",
//     targetKey: "id",
// });

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

    // houseOrders: houseOrders,
    // apartmentOrders: apartmentOrders,
    // chaletOrders: chaletOrders,
    // landOrders: landOrders,
    // villaOrders: villaOrders,
    // warehouseOrders: warehouseOrders,

}; 