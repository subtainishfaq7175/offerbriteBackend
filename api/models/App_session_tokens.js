/**
 * App_session_tokens.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    app_id: {
      type:'INTEGER'
    },
    auth_token_value: {
      type:'STRING'
    },
    ip_address: {
      type:'STRING'
    },
    imei_number: {
      type:'STRING'
    },
    status: {
      type:'STRING'
    },
    'user_id': {
      model: 'Users'
    }

  }
};

