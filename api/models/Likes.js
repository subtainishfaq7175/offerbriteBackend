/**
 * Likes.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user_id: {
      type: 'INTEGER'
    },
    is_liked : {
      type: 'INTEGER'
    },
    status: {
      type : 'INTEGER'
    },
    'offer_id' : {
      model: 'Offers'
    }

  },


  'like': function (params, callback) {
    'use strict';

      this.findOrCreate(params).exec(function (err, like) {
        sails.log.info(err);
        sails.log.info('--------------------------');
        sails.log.info(like)
        if (err) callback(err, null);
        else if(like){

          if(params.is_liked == 1){
            callback(null, UtilityServices.resSuccess("S003"));
          } else {
            callback(null, UtilityServices.resSuccess("S004"));

          }
        }
        else callback(UtilityServices.resError("E005"), null);

      });


  }


};

