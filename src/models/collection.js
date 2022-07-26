'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }
  //for visitors
  get() {
    try {
      return this.model.findAll();

    } catch {
      console.error("Error in getting all data")
    }
  }
  getById(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      console.error("post does not exist")
    }
  }
  //for users and admins
  async createRecord(realId, userId, obj) {
    obj.userId = userId;
    if (realId === userId) {
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
  async getOneDash(userId, postId) {
    if (!postId) {
      throw new Error('No post id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      if (userId === record.userId) {
        try {
          return record;
        } catch (e) {
          console.error('Error while getting record in model', this.model);
        }
      } else {
        console.error('You are not the owner of this post');
      }
    } else {
      console.error(`There is no model with this id`);
    }
  }
  async getAllDash(userId) {
    if (userId) {
      return this.model.findAll({ where: { userId } });
    }
    else {
      console.error("post is not exist")
    }
  }
  async updateDash(userId, postId, obj) {
    let updated = null;
    if (!postId) {
      throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      if (userId === record.userId) {
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
  async removeDash(userId, postId) {
    if (!postId) {
      throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: postId } });
    if (record) {
      if (userId === record.userId) {
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
  //for admins only
  // async removeUserRecord(postId) {
  //   if (!postId) {
  //     throw new Error('No id provided for model ', this.model)
  //   }
  //   let record = await this.model.findOne({ where: { id: postId } });
  //   if (record) {
  //     try {
  //       let deleted = await this.model.destroy({ where: { id: postId } });
  //       return deleted;
  //     } catch (e) {
  //       console.error('Error in deleting record in model ', this.model);
  //     }

  //   } else {
  //     console.error(`There is no model with this id: ${id}`);
  //   }

  // }
 

}
module.exports = Collection;


