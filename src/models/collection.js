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
  getAll(id){

       if (id) {
      return this.model.findAll({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
}

getById(postId){
 
     if (postId) {
    return this.model.findOne({ where: { id:postId } });
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
    async createRecord(realId,userId,obj) {
      obj.userId=userId;
      
      if(realId == userId){
        try {     
          // users.findOne({where:{id:userId}})
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error("Error in creating a new record in model ", this.model)
        }   
        
      }else{

        console.error("the real user id  not matching the id that you sent by params")

      }
    }


    async update(userId,postId,obj) {
    
      let updated=null;
      if (!postId) {
          throw new Error('No id provided for model ', this.model)
      }
      let record = await this.model.findOne({ where: { id: postId } });
    
      if(record){
          if(userId===record.userId){
              try {
                updated = await this.model.update(obj,{where:{id:postId},returning: true});
                console.log("Updated",updated);
                return updated;
            } catch (e) {
                console.error("Error in updating record in model ", this.model)
            }
              }else{
                console.error('You can not update posts of other users !!  ');
              }
      }else{
          console.error(`There is no model with this id: ${id}`);
      }
      
  }
  async removeRecord(userId,postId) {
    if (!postId) {
        throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id:postId } });
    if(record){
        if(userId===record.userId){
            try {
                let deleted = await this.model.destroy({ where: { id: postId } });
                return deleted;
            } catch (e) {
                console.error('Error in deleting record in model ', this.model);
            }
        }else{
            console.error('You can not delete posts of other users !!  ');
          }
    }else{
        console.error(`There is no model with this id: ${id}`);
    }
    
}
  

async removeUserRecord(postId) {
  if (!postId) {
      throw new Error('No id provided for model ', this.model)
  }
  let record = await this.model.findOne({ where: { id:postId } });
  if(record){
          try {
              let deleted = await this.model.destroy({ where: { id: postId } });
              return deleted;
          } catch (e) {
              console.error('Error in deleting record in model ', this.model);
          }
      
  }else{
      console.error(`There is no model with this id: ${id}`);
  }
  
}
}
module.exports = Collection;

