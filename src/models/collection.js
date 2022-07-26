'use strict';
// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!
class Collection {
  constructor(model) {
    this.model = model;
  }
  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }
  getAll(id) {

    if (id) {
      return this.model.findAll({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  getById(postId) {

    if (postId) {
      return this.model.findOne({ where: { id: postId } });
    }
    else {
      return this.model.findAll({});
    }
  }
  // async createRecord(userId,obj) {
  //   obj.userId=userId;
  //       try {   

  //           let newRecord = await this.model.create(obj);
  //           return newRecord;
  //       } catch (e) {
  //           console.error("Error in creating a new record in model ", this.model)
  //       }   
  //   }
  async createRecord(realId, userId, obj) {
    obj.userId = userId;


    if (realId == userId) {
      try {
        // users.findOne({where:{id:userId}})
        let newRecord = await this.model.create(obj);
        return newRecord;
      } catch (e) {
        console.error("Error in creating a new record in model ", this.model)
      }

    } else {

      console.error("the real user id  not matching the id that you sent by params")


    }
  }




  async update(realId, userId, postId, obj) {

    let updated = null;
    if (!postId) {
      throw new Error('No id provided for model ', this.model)
    }


    let record = await this.model.findOne({ where: { id: postId } });

    if (record) {
      if (realId === userId) {

        try {
          updated = await this.model.update(obj, { where: { id: postId }, returning: true });
          console.log("Updated", updated);
          return updated;
        } catch (e) {
          console.error("Error in updating record in model ", this.model)
        }
      } else {
        console.error('You can not update posts of other users !!  ');
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }

  }


  async removeRecord(realId, userId, postId) {

    if (!postId) {
      throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {

      if (realId === userId) {

        try {
          let deleted = await this.model.destroy({ where: { id: postId } });
          return deleted;
        } catch (e) {
          console.error('Error in deleting record in model ', this.model);
        }
      } else {
        console.error('You can not delete posts of other users !!  ');
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }

  }


  async removeUserRecord(postId) {
    if (!postId) {
      throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      try {
        let deleted = await this.model.destroy({ where: { id: postId } });
        return deleted;
      } catch (e) {
        console.error('Error in deleting record in model ', this.model);
      }

    } else {
      console.error(`There is no model with this id: ${id}`);
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

      if (priceFrom!== "all" && priceTo!== "all")
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






}
module.exports = Collection;


