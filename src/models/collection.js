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

  async removeUserRecord(postId) {
    if (!postId) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      try {
        let deleted = await this.model.destroy({ where: { id: postId } });
        return deleted;
      } catch (e) {
        console.error("Error in deleting record in model ", this.model);
      }
    } else {
      console.error(`There is no model with this id: ${id}`);
    }
  }
}
module.exports = Collection;
