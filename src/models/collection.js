
"use strict";
// const {users} = require("../models/index.model");


class Collection {
  constructor(model) {
    this.model = model;
  }

  get() {
    try {
      return this.model.findAll();
    } catch {
      console.error("Error in getting all data");
    }
  }
  getById(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    } else {
      console.error("post does not exist");
    }
  }

  async getMyposts(realId, userId, model, postId) {
    if (realId === userId) {
      if (postId) {
        return this.model.findOne({
          where: { userId: realId, model: model, id: postId },
        });
      }
      if (model && !postId) {
        return this.model.findAll({ where: { userId: realId, model: model } });
      }
      if (!model && !postId) {
        return this.model.findAll({ where: { userId: realId } });
      }

    }
    console.log("id not matching  ");
  }

  //for users and admins
  async createRecord(realId, userId, obj) {
    obj.userId = userId;
    if (realId == userId) {
      try {
        // users.findOne({where:{id:userId}})
        let newRecord = await this.model.create(obj);
        return newRecord;
      } catch (e) {
        console.error("Error in creating a new record in model ", this.model);
      }
    } else {

      console.error(
        "the real user id  not matching the id that you sent by params"
      );
    }
  }

  async update(realId, userId, postId, obj) {

    let updated = null;
    if (!postId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      if (realId === userId) {

        try {
          updated = await this.model.update(obj, {
            where: { id: postId },
            returning: true,
          });

          return updated;
        } catch (e) {
          console.error("Error in updating record in model ", this.model);
        }
      } else {
        console.error("You can not update posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }
  async updatePro(realId, userId, postId, obj) {

    let updated = null;
    if (!userId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({ where: { id: userId } });
    if (record) {
      if (realId === userId) {

        try {
          updated = await this.model.update(obj, {
            where: { id: userId },
            returning: true,
          });

          return updated;
        } catch (e) {
          console.error("Error in updating record in model ", this.model);
        }
      } else {
        console.error("You can not update posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }
  async getOrder(postId, userId, userPostId) {

    if (postId) {

      let record = await this.model.findOne({ where: { id: postId } });
      // let userContact =await users.findOne({where: {id:userId}})
      let obj = {

        postId: postId,
        OwnerId: record.userId,
        customerId: userId,
        model: record.model,
        // customerName : userContact.id,
      }
      return obj;
    }
  }

  async getbyNull() {
    let ids = null;
    return this.model.findAll({ where: { userId: ids } });
  }
  async removeRecord(realId, userId, postId, role) {

    if (!postId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {

      if (realId === userId || role == "admin") {

        try {
          let deleted = await this.model.destroy({ where: { id: postId } });
          return deleted;
        } catch (e) {
          console.error("Error in deleting record in model ", this.model);
        }
      } else {
        console.error("You can not delete posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }

  async clear(postId) {
    let ids = null;
    try {
      let deleted = await this.model.destroy({
        where: { userId: ids },

      })
      console.log(ids, " 🔥💛🔥💛💛💛🔥🥩🥩🍞🥩");
      return deleted;
    } catch (e) {
      console.error("Error in deleting record in model ");
    }
  }




  async readFiltered(process, city, owner, availability, buildingAge, furnished, rooms, bathRooms, rentDuration, floors, priceFrom, priceTo) {
    try {
      let record = null;
      let options = { where: {} };

      if (process !== "all")
        options.where.process = process;
      if (city !== "all")
        options.where.city = city;
      if (owner !== "all")
        options.where.owner = owner
      if (availability !== "all")
        options.where.availability = availability
      if (buildingAge !== "all")
        options.where.buildingAge = buildingAge
      if (furnished !== "all")
        options.where.furnished = furnished
      if (rooms !== "all")
        options.where.rooms = rooms
      if (bathRooms !== "all")
        options.where.bathRooms = bathRooms
      if (rentDuration !== "all")
        options.where.rentDuration = rentDuration
      if (floors !== "all")
        options.where.floors = floors

      if (priceFrom !== "all" && priceTo !== "all")
        options.where.price = { $between: [priceFrom, priceTo] }

      // if (surfaceAreaFrom && surfaceAreaTo)
      // options.where.surfaceArea = {$between: [surfaceAreaFrom, surfaceAreaTo]}
      // if (landAreaFrom && landAreaTo)
      // options.where.landArea = {$between: [landAreaFrom, landAreaTo]}


      console.log({ options });
      record = await this.model.findAll(options);
      return record;

    } catch (e) {
      console.error("Error in reading filtered model", this.model)
    }

  }


  // create user Profile
  async createProfile(realId, userId, obj) {
    if (realId == userId) {
      try {
        let newRecord = await this.model.create(obj);
        // return newRecord;
        console.log("newRecord++++++++",newRecord);
      } catch (e) {
        console.error("Error in creating a new record in model ", this.model);
      }
    } else {

      console.error("the real user id  not matching the id that you sent by params");
    }
  }

  // update user Profile
  async updateProfile(realId, userId, obj) {
    let updated = null;
    if (!userId) {
      throw new Error("No id provided for model ", this.model);
    }
    let updaterecord = await this.model.findOne({
      where: {
        userId: userId
      }
    });
    console.log(this.model, "****************");
    if (updaterecord) {
      if (realId === userId) {
        console.log("++++++++++++++");
        try {
          updated = await this.model.update(obj, {
            where: { userId: userId },
            returning: true
          });
          return updated;
        } catch (e) {
          console.error("Error in updating record in model ", this.model)
        }
      } else {
        console.error("You can not update posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }
  // read user Profile
  // async getProfile(realId, userId, role) {
  //   if (realId === userId || role === "admin") {
  //     return this.model.findOne({
  //       where: { userId: userId },
  //     });
  //   } else {
  //     console.error("you can't see contact information for other users, please make an order");
  //   }
  // }

  // read all user Profiles
  async getAllProfiles( userId,role) {
    if(!userId){

      if (role === "admin") {
        return this.model.findAll({});
      } else {
        console.error("you can't see contact information for other users, please make an order");
      }
    }else{
      return this.model.findOne({where:{userId:userId}})
    }
  }
}






module.exports = Collection;
