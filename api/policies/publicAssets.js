/**
 * App Key and secret key based authentication Policy
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function getPublicList(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller

    sails.log.info('Public Offers');
    sails.log.info(req.headers);
    sails.log.info('---------------');
      Offers.find({
          where: { is_public : 1}
      })
          .populate('Likes')
          .populate('Follows')
          .exec(function (err, resData) {
          if (resData.length > 0){

              async.forEachOf(resData,function(value, key, callback){
                  resData[key].totalLikes = resData[key].Likes.length;
                  resData[key].totalFollows = resData[key].Follows.length;
                  callback();
              });

              resData.Likes = 0;
              resData.Follows = 0;

              return res.send(200, UtilityServices.resSuccess(resData));
          }
          else return res.send(400, UtilityServices.resSuccess("S002"));

      });

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

};
