"use strict";


class OrderCollection {
  constructor(model) {
    this.model = model;
  }

//   getOrder(postId) {
//     if (postId) {
//       return this.model.findOne({ where: { id: postId } });
//     } else {
//       console.error("does not exist");
//     }
//   }
get() {
  try {
    return this.model.findAll();
  } catch {
    console.error("Error in getting all data");
  }
  
}
getById(postId,orderId) {
  if(postId){
    if (orderId) {
      return this.model.findOne({
        where: {
          postId:postId, id:orderId,
        }
      });
    } else {
      return this.model.findAll({
        where: {
          postId:postId,
        }
      });
    }
  }else{

    console.log("sorry , there is no orders on this post");
  }

}
getOrder(id,action) {
    
    if (id && !action) {
      return this.model.findOne({ where: { id: id  } });
    }else if(id && action) {
console.log(action);
if(action=="send"){


  console.log("this will fire a (socket.emit) to the owner(socket.on) 🔥🔥🔥and  the project🔥🔥🔥" )

  return this.model.findOne({ where: { id: id  } });

}else if(action==="delete"){
  

  this.model.destroy({where:{id:id}})
 

}else {
  let data ="there is no action ❌❌❌❌"
  console.log(data); 

}
    }
     else {
      return this.model.findAll({});
    }
  }

 


  async createMessage(data){
 console.log("++++++++++++++++++++++++++" , data);
if(data){
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

  async myMessages(realId,userId,messageId,action){
 if(realId==userId && messageId && action=="okay"){

  let data="fire socket from owner to admin to accept order🔥🔥🔥✔💚"
  return data;

  }else if(realId==userId && messageId && action=="sorry"){

    let data="fire socket from owner to admin to reject order🔥🔥🔥❌❌"
    return data;
  
    }else if(realId==userId && !messageId && !action){

      return this.model.findAll({where:{userId : userId}})
      
      }else if(realId==userId && messageId && !action){

        return this.model.findOne({where:{userId : userId,id:messageId}})
        
        }else{

          let data="cannot see others messages❌❌"
          return data;

        }
}
async createOrder( order){

    let orderRecord =  await this.model.create(order)
     if(orderRecord){
    
    
      return orderRecord;
     }else{
    
      console.log("could'nt create order");
     }
    }
      
}
module.exports = OrderCollection;