/**
 * Authorization Policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function getAuthorization(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.headers.token) {
      var strtoken = req.headers.token;
      App_session_tokens.findOne({
          where: {auth_token_value: strtoken, status: 1 }
      }).exec(function(err, resAuthorization) {
          if (resAuthorization) {req.user_id = resAuthorization.user_id; next();}
          else return res.send(400, UtilityServices.resError("E006"));
      });
  } else {
      next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

};
