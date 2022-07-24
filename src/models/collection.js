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

  async createRecord(userIdParams,obj) {
    obj.userId=userIdParams;
        try {     
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error("Error in creating a new record in model ", this.model)
        }   
    }

  update(id, data) {
    return this.model.findOne({ where: { id } })
      .then(record => record.update(data));
  }
  delete(id) {
    return this.model.destroy({ where: { id }});
  }
}
module.exports = Collection;

