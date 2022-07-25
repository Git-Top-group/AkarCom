'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const userModel=require("./users/users");
const userImagesModel=require("./users/imgUsers");

const housesModel=require("./houses/houses");
const houseImagesModel=require("./houses/imgHouses");

const apartmentsModel=require("./apartments/apartment");
const apartmentImagesModel=require("./apartments/imgApartment");

const chaletsModel=require("./chalets/chalets");
const chaletImagesModel=require("./chalets/imgChalets");

const landsModel=require("./lands/lands");
const landImagesModel=require("./lands/imgLands");

const villasModel=require("./villas/villas");
const villaImagesModel=require("./villas/imgVillas");

const warehousesModel=require("./warehouses/warehouses");
const warehouseImagesModel=require("./warehouses/imgWarehouses");

const Collection=require("./collection");

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
process.env.NODE_ENV === "production"
     ? {
         dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false}
         },
     }
     : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const users = userModel(sequelize,DataTypes);
const houses = housesModel(sequelize, DataTypes);
const apartments = apartmentsModel(sequelize, DataTypes);
const chalets = chaletsModel(sequelize, DataTypes);
const lands = landsModel(sequelize, DataTypes);
const villas = villasModel(sequelize, DataTypes);
const warehouses = warehousesModel(sequelize, DataTypes);



const userImages = userImagesModel(sequelize,DataTypes);
const houseImages = houseImagesModel(sequelize,DataTypes);
const apartmentImages = apartmentImagesModel(sequelize,DataTypes);
const chaletImages = chaletImagesModel(sequelize,DataTypes);
const landImages = landImagesModel(sequelize,DataTypes);
const villaImages = villaImagesModel(sequelize,DataTypes);
const warehouseImages = warehouseImagesModel(sequelize,DataTypes);

const db = {};
db.userImages=userImages;
db.houseImages=houseImages;
db.apartmentImages=apartmentImages;
db.chaletImages=chaletImages;
db.landImages=landImages;
db.villaImages=villaImages;
db.warehouseImages=warehouseImages;

//1-1 relationship between users and their images
users.hasOne(userImages, {
    foreignKey: "userId",
    sourceKey: "id"
});

userImages.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

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
    foreignKey: "houseId",
    sourceKey: "id"
});

houseImages.belongsTo(houses, {
    foreignKey: "houseId",
    targetKey: "id",
});

apartments.hasMany(apartmentImages, {
    foreignKey: "apartmentId",
    sourceKey: "id"
});

apartmentImages.belongsTo(apartments, {
    foreignKey: "apartmentId",
    targetKey: "id",
});

chalets.hasMany(chaletImages, {
    foreignKey: "chaletId",
    sourceKey: "id"
});

chaletImages.belongsTo(chalets, {
    foreignKey: "chaletId",
    targetKey: "id",
});

lands.hasMany(landImages, {
    foreignKey: "landId",
    sourceKey: "id"
});

landImages.belongsTo(lands, {
    foreignKey: "landId",
    targetKey: "id",
});

villas.hasMany(villaImages, {
    foreignKey: "villaId",
    sourceKey: "id"
});

villaImages.belongsTo(villas, {
    foreignKey: "villaId",
    targetKey: "id",
});

warehouses.hasMany(warehouseImages, {
    foreignKey: "warehouseId",
    sourceKey: "id"
});

warehouseImages.belongsTo(warehouses, {
    foreignKey: "warehouseId",
    targetKey: "id",
});



module.exports = {
    sequelize:sequelize,
    DataTypes:DataTypes,
    houses: new Collection(houses),
    apartments: new Collection(apartments),
    chalets: new Collection(chalets),
    lands: new Collection(lands),
    villas: new Collection(villas),
    warehouses: new Collection(warehouses),

    /*houseImages: new Collection(houseImages),
    apartmentImages: new Collection(apartmentImages),
    chaletImages: new Collection(chaletImages),
    landImages: new Collection(landImages),
    villaImages: new Collection(villaImages),
    warehouseImages: new Collection(warehouseImages),*/

    users: users,
   // userImages: new Collection(userImages),
   db:db
}; 