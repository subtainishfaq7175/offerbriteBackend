/**
 * App Key and secret key based authentication Policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function getAuthentication(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller

    var params = {};

    if(req.headers.secret_key){
        params.secret_key = req.headers.secret_key;
        params.api_key = req.headers.api_key;
    } else {
        params.secret_key = req.body.secret_key;
        params.api_key = req.body.api_key;
    }

    if (params.api_key && params.secret_key) {

        App_credentials.findOne({
          where: {
              app_api_key : params.api_key,
              app_secret_id : params.secret_key
          }
      }).exec(function (err, resDataAuthentication) {
          if (resDataAuthentication) next();
          else return res.send(400, UtilityServices.resError("E001"));
      });
  } else {

      return res.send(400, UtilityServices.resError("E001"));
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

};
