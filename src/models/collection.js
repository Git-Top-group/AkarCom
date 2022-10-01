"use strict";

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
      return this.model.findOne({
        where: {
          id,
        },
      });
    } else {
      console.error("post does not exist");
    }
  }
  action(id) {
    if (id) {
      console.log(
        "this will fire a (socket.emit) to the admin(socket.on) 🔥🔥🔥"
      );

      return this.model.findOne({ where: { id: id } });
    } else {
      return this.model.findAll({});
    }
  }
  async getMyposts(realId, userId, model, postId) {
    if (realId === userId) {
      if (postId) {
        let data = await this.model.findOne({
          where: {
            userId: realId,
            model: model,
            id: postId,
          },
        });
        if (data) {
          return data;
        } else {
          let err = "sorry, we cannot find this post";
          return err;
        }
      }
      if (model && !postId) {
        return this.model.findAll({
          where: {
            userId: realId,
            model: model,
          },
        });
      }
      if (!model && !postId) {
        return this.model.findAll({
          where: {
            userId: realId,
          },
        });
      }
    }
    console.log("id not matching  ");
    let data = "you cannot access other users dashboard";
    return data;
  }
  async createRecord(realId, userId, obj) {
    obj.userId = userId;
    console.log("objjjjjjjjjjjjjjjjjjjjjjjjjj", obj)
    if (realId == userId) {
      try {
        // users.findOne({where:{id:userId}})
        let newRecord = await this.model.create(obj);
        console.log("newRecordddddddddddddddddddddd", newRecord)

        return newRecord;
      } catch (e) {
        let data = "the body you sent is not correct";
        return data;
      }
    } else {
      let data = "real id  is not matching the id that you sent by params";
      return data;
    }
  }
  async updatePost(realId, userId, postId, obj) {
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
    let record = await this.model.findOne({
      where: {
        id: userId,
      },
    });
    if (record) {
      if (realId === userId) {
        try {
          updated = await this.model.update(obj, {
            where: {
              id: userId,
            },
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

  async removeRecord(realId, userId, postId, role) {
    if (!postId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({
      where: {
        id: postId,
      },
    });
    if (record) {
      if (realId === userId || role == "admin") {
        try {
          let deleted = await this.model.destroy({
            where: {
              id: postId,
            },
          });
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
        where: {
          userId: ids,
        },
      });
      console.log(ids, " 🔥💛🔥💛💛💛🔥🥩🥩🍞🥩");
      return deleted;
    } catch (e) {
      console.error("Error in deleting record in model ");
    }
  }
  async readFiltered(
    process,
    city,
    owner,
    availability,
    buildingAge,
    furnished,
    rooms,
    bathRooms,
    rentDuration,
    floors,
    priceFrom,
    priceTo
  ) {
    try {
      let record = null;
      let options = {
        where: {},
      };

      if (process !== "all") options.where.process = process;
      if (city !== "all") options.where.city = city;
      if (owner !== "all") options.where.owner = owner;
      if (availability !== "all") options.where.availability = availability;
      if (buildingAge !== "all") options.where.buildingAge = buildingAge;
      if (furnished !== "all") options.where.furnished = furnished;
      if (rooms !== "all") options.where.rooms = rooms;
      if (bathRooms !== "all") options.where.bathRooms = bathRooms;
      if (rentDuration !== "all") options.where.rentDuration = rentDuration;
      if (floors !== "all") options.where.floors = floors;

      if (priceFrom !== "all" && priceTo !== "all")
        options.where.price = {
          $between: [priceFrom, priceTo],
        };

      // if (surfaceAreaFrom && surfaceAreaTo)
      // options.where.surfaceArea = {$between: [surfaceAreaFrom, surfaceAreaTo]}
      // if (landAreaFrom && landAreaTo)
      // options.where.landArea = {$between: [landAreaFrom, landAreaTo]}

      console.log({
        options,
      });
      record = await this.model.findAll(options);
      return record;
    } catch (e) {
      console.error("Error in reading filtered model", this.model);
    }
  }

  async getSearch(term, op) {
    if (term) {

      return this.model.findAll({
        where: {
          address: {
            [op.regexp]: `.*${term}.*`
          },
        }
      })
    }

  }







}
module.exports = Collection;
