/**
 * App_credentials.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    'app_title': {
      type: 'string',
    },

    'app_secret_id': {
      type: 'string',
    },

    'app_api_key': {
      type: 'string',
    }

  }
};

