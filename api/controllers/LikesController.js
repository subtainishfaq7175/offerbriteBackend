/**
 * LikesController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    
    'makeLike': function (req, res) {

        var params = req.params.all();

        Likes.like(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                return res.send(200, resOffer);
            }
        });
    }
};

