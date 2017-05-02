/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');
var objMD5 = require('MD5');

module.exports = {

  attributes: {

    username: {
      type: 'STRING'
    },
    email: {
      type: 'email',
      unique: true
    },
    password: {
      type: 'STRING'
    },
    gender: {
      type: 'STRING'
    },
    status: {
      type : 'INTEGER'
    },
    image: {
      type : 'STRING'
    },
    phone: {
      type : 'STRING',
      defaultsTo: '111-222-3333'
    },
    userType: {
      type : 'INTEGER'
    },
    country: {
      type : 'STRING'
    },
    nationality : {
      type : 'STRING'
    },
    website : {
      type : 'STRING'
    },
    city : {
      type : 'STRING'
    },
    dob : {
      type : 'STRING'
    },
    Last_login : {
      type : 'STRING'
    },

  deletedAt:{
    type:'boolean'
  }

  },

  beforeFind: function(values, cb) {
    values.deletedAt = false;
    cb();
  },

  /*
  * A function that encrypt the password before insertion.
   */
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  },


  /**
   * User login function that calls the user login method developed in the user model pass params and a
   * callback response.

   */
  
  'userLogin' : function (params, callback) {
    'use strict';

    var strToken = "";

    this.findOne({email: params.email}).exec(function (err, user) {


      if(err) callback(err, null);
      if(params.password && user) {
        bcrypt.compare(params.password,
            user.password, function (err, res) {
              if (err) callback(err, null);
              if (res) {
                strToken = userService.strRandom(1, 10000000, 99999999);
                strToken = objMD5(strToken);

                App_session_tokens.create({
                  'auth_token_value': strToken,
                  'app_id': 1,
                  'user_id': user.id,
                  'imei_number': params.imei,
                  "ip_address": params.ip,
                  "status": 1
                }).exec(function (err, resDataCreateToken) {
                  if (err) callback(err, null);
                  if (resDataCreateToken) {

                    var FieldCount = 0;
                    var arrValues = ['username', 'email', 'gender', 'image', 'phone', 'userType', 'country', 'nationality', 'website', 'city', 'dob'];

                    async.forEachOf(user, function (value, key, callback) {
                      if (value && arrValues.indexOf(key) >= 0)
                        FieldCount++;
                      callback();
                    });

                    var getPercentage = 0;
                    if (user.userType == 2) {
                      getPercentage = ((FieldCount * 100) / 11).toFixed(0);
                    } else if (user.userType == 3) {
                      getPercentage = ((FieldCount * 100) / 10).toFixed(0);
                    } else {
                      getPercentage = ((FieldCount * 100) / 11).toFixed(0);
                    }

                    user.token = strToken;
                    user.profilePercentage = parseInt(getPercentage);
                    delete user['password'];
                    delete user['updatedAt'];
                    callback(null, UtilityServices.resSuccess(user));
                  }
                });
              } else {
                callback(UtilityServices.resError("E003"), null);
              }
            });
      } else {
        callback(UtilityServices.resError("E007"), null);
      }


    });

  },
  
  'findUsers': function (params, callback) {
    'use strict';

    if(params.id){
      this.findOne({id: params.id}).exec(function (err, user) {

        if (err) callback(err, null);
        else if(user) callback(null, UtilityServices.resSuccess(user));
        else callback(UtilityServices.resSuccess("S002"), null);

      });
    } else {
      this.find({where:{deletedAt:null}}).exec(function (err, users) {
        if (err) callback(err, null);
        else if(users) callback(null, UtilityServices.resSuccess(users));
        else callback(UtilityServices.resSuccess("S002"), null);
      });
    }

  },



  /*

   */

  'addUser' :  function (params, callback) {
    'use strict';

    this.create(params).exec(function (err, user) {
      if (err) callback(err, null);
      else if (user) callback(null, UtilityServices.resSuccess(user));
      else callback(UtilityServices.resError("E005"), null);

    });

  }

};

