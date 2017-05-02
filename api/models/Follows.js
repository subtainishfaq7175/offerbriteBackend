/**
 * Follows.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user_id: {
      type: 'INTEGER'
    },
    is_followed : {
      type: 'INTEGER'
    },
    status: {
      type : 'INTEGER'
    },
    'offer_id': {
      model: 'Offers'
    }
  },


  'makeFollows': function (params, callback) {
    'use strict';

    this.findOrCreate(params).exec(function (err, follow) {
      if (err) callback(err, null);
      else if(follow){

        if(params.is_followed == 1){
          callback(null, UtilityServices.resSuccess("S005"));
        } else {
          callback(null, UtilityServices.resSuccess("S006"));

        }
      }
      else callback(UtilityServices.resError("E005"), null);

    });
  }

};

