/**
 * FollowsController
 *
 * @description :: Server-side logic for managing follows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    'makeFollows': function (req, res) {

        var params = req.params.all();

        Follows.makeFollows(params, function (err, resFollows) {
            if(err) res.send(400, err);
            if(resFollows){
                return res.send(200, resFollows);
            }
        });
    }
};

