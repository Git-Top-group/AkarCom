"use strict";


class notificationsCollection {
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
  async getById(postId, orderId) {
    if (postId) {
      if (orderId) {
        let order = await this.model.findOne({
          where: {
            postId: postId, id: orderId,
          }
        });
        return order;
      } else {
        let orders = await this.model.findAll({
          where: {
            postId: postId,
          }
        });
        return orders;
      }
    } else {
      console.log("sorry , there is no orders on this post");
    }

  }
  // orderAction(orderId, postId, action) {
  //   if (postId) {
  //     if (orderId) {
  //       if (action) {
  //         if (action == "accept") {
  //           console.log("this will fire a (socket.emit) to the owner(socket.on) 🔥🔥🔥and  the project🔥🔥🔥")
  //           return this.model.findOne({ where: { id: orderId } });
  //         } else if (action === "reject") {
  //           this.model.destroy({ where: { id: orderId } })
  //         } else {
  //           let data = "there is no action ❌❌❌❌"
  //           console.log(data);
  //         }
  //       }
  //     }
  //   }
  // }
  async createMessage(data) {
    console.log("++++++++++++++++++++++++++", data);
    if (data) {
      console.log("----------------------- has been sent");
      return this.model.create(data)
    }


  }
  //   async getMyorders(messageId, action){


  //     if(messageId && !action){


  // return this.model.findOne({where:{id : messageId}})

  //     }else if(messageId && action){
  // if(action=="okay"){

  //   console.log("fire socket from owner to admin to accept order🔥🔥🔥✔💚");
  //   return this.model.findOne({where:{id : messageId}})
  // }if(action=="sorry"){
  //   console.log("fire socket from owner to admin to reject order🔥🔥🔥❌❌");
  //   return this.model.findAll({})
  // }

  //   }else if(!messageId && !action){
  //     return this.model.findAll({})

  //   }else{
  //  console.error("Invalid path")
  //   }
  // }

  
async update2(id ,action ){

  // let order =await this.model.findOne({
  //   where: {id:id}
  // })
  let obj = {
    status: action,
  
  }
  let updated =await this.model.update(obj, { where: { id: id }, returning: true, })
  if(updated){

    console.log(updated)
    return updated

  }else return

}
async delete2(dataID) {
  if (!dataID) {
      throw new Error('No id provided for model ', this.model)
  }
  try {
      let deleted = await this.model.destroy({ where: { id: dataID } });
      let data={orderID :dataID}
      return data;
  } catch (e) {
      console.error('Error in deleting record in model ', this.model);
  }
}
  async myMessages(realId, userId, messageId, action) {
    if (realId == userId && messageId && action == "okay") {

      let data = "fire socket from owner to admin to accept order🔥🔥🔥✔💚"
      return data;

    } else if (realId == userId && messageId && action == "sorry") {

      let data = "fire socket from owner to admin to reject order🔥🔥🔥❌❌"
      return data;

    } else if (realId == userId && !messageId && !action) {

      return this.model.findAll({ where: { userId: userId } })

    } else if (realId == userId && messageId && !action) {

      return this.model.findOne({ where: { userId: userId, id: messageId } })

    } else {

      let data = "cannot see others messages❌❌"
      return data;

    }
  }
  async createOrder(order) {

    let orderRecord = await this.model.create(order)
    if (orderRecord) {


      return orderRecord;
    } else {

      console.log("could'nt create order");
    }
  }
  async getMyOrders(realId, clientId, orderId) {
    if (realId === clientId) {
      if (orderId) {
        return this.model.findOne({
          where: {
            clientId: realId,
            id: orderId
          },
        });
      }
      else {
        return this.model.findAll({
          where: {
            clientId: realId
          }})}}
    console.log("id not matching  ");
  }

  async removeRecord(dataID) {
    if (!dataID) {
        throw new Error('No id provided for model ', this.model)
    }
    try {
        let deleted = await this.model.destroy({ where: { id: dataID } });
        return deleted;
    } catch (e) {
        console.error('Error in deleting record in model ', this.model);
    }
}
}
module.exports = notificationsCollection;