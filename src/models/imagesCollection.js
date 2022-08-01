"use strict";


class ImageCollection {
  constructor(model) {
    this.model = model;
  }

  async createImage(realId, userId, postId, obj, model) {
    if (realId == userId) {
      obj.userId = userId;
      obj.postId = postId;
      obj.model = model;
      try {
        let newRecord = await this.model.create(obj);
        return newRecord;
      } catch (e) {
        console.error("Error in creating a new record in model ");
      }
    } else {

      console.error(
        "the real user id  not matching the id that you sent by params"
      );
    }
  }
  async updateImage(realId, userId, postId, obj, model) {
    console.log(realId, userId, postId, model);
    let updated = null;
    if (!postId || !model) {
      throw new Error("No id provided for model ", this.model);
    }
    let record = await this.model.findOne({
      where: {
        postId: postId,
        model: model
      }
    });
    if (record) {
      if (realId === userId) {
        try {
          updated = await this.model.update(obj, {
            where: {
              postId: postId,
              model: model,
              userId: userId
            },
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
      console.error(`There is no model with this id`);
    }
  }
  async deleteImage(realId, userId, postId, model) {
    if (!postId || !model) {
      throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({
      where: {
        postId: postId,
        model: model
      }
    });
    if (record) {
      if (realId === userId) {
        try {
          let deleted = await this.model.destroy({ where: { postId: postId, model: model, userId: userId } });
          return deleted;
        } catch (e) {
          console.error('Error in deleting record in model ', this.model);
        }
      } else {
        console.error("You can not delete posts of other users !!  ");
      }
    } else {
      console.error(`There is no model with this id}`);
    }
  }
  async getPostImages(realId, userId, model, postId) {
    if (!postId || !model) {
      throw new Error('No id provided for model ', this.model)
    }
    if (realId === userId) {
      if (postId && model) {
        return await this.model.findOne({
          where: {
            model: model,
            postId: postId,
            userId: userId
          },
        });
      }
    } else { throw new Error("ID not matching !!  "); }
  }
  getImages(postId, model) {
    if (postId && model) {
      try {
        return this.model.findOne({
          where: {
            postId: postId,
            model: model
          }
        });
      } catch {
        console.error("Error in getting all data");
      }
    }
  }
  /*getImageById(postId, imageId) {
    if (postId) {
      return this.model.findOne({
        where: {
          postId: postId,
          id: imageId
        }
      });
    } else {
      console.error("post does not exist");
    }
  }*/

};
module.exports = ImageCollection;