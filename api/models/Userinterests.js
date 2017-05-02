/**
 * Userinterests.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    catogery_id : {
      type: 'INTEGER'
    },
    status: {
      type : 'INTEGER'
    },
    'user_id': {
      type: 'INTEGER'
    },

      'catogery_id':{
        model: 'Categories'
      }
  }
};

