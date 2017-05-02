/**
 * OffersController
 *
 * @description :: Server-side logic for managing offers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

module.exports = {

    getOffer: function (req, res) {

        var params = req.params.all();

        params.id = params.id;

        sails.log.info('getOffer');
        sails.log.info(req.headers);
        sails.log.info('rrrrrrrrrrrrrrrrr');
        var params = req.params.all();

        Offers.getOffer(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                if(req.session.isAdmin)
                    res.view('templates/offerDetails' , { moment: moment, data: resOffer.response_data, layout: 'adminLayout'});
                else{
                    return res.send(200, resOffer);
                }
            }
        });

    },

    getOffers: function (req, res) {

        sails.log.info('getOffers with token and without token');

        var params = req.params.all();

        params.user_id = req.user_id;


        Offers.getOffers(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                return res.send(200, resOffer);
            }
        });

    },

    /*
    * Creating a new offer.
    */

    'makeOffer': function (req, res) {
        'use strict';

        var params = req.params.all();

        Offers.addNew(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                return res.send(200, resOffer);
            }
        });
    },


    /*
    * Creating a new offer.
    */

    'userOffers': function (req, res) {
        'use strict';

        sails.log.info('userOffers');
        sails.log.info(req.headers);
        sails.log.info('---------------');

        var params = req.params.all();
        params.token = req.headers.token;
        params.user_id = req.user_id;

        Categories.userOffers(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                return res.send(200, resOffer);
            }
        });
    },


    /*
    * Creating a new offer.
    */

    'userLikedOffers': function (req, res) {
        'use strict';

        sails.log.info('userLikedOffers');
        sails.log.info(req.headers);
        sails.log.info('---------------');

        var params = req.params.all();
        params.token = req.headers.token;
        params.user_id = req.user_id;

        Offers.userLikedOffers(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                return res.send(200, resOffer);
            }
        });
    },

    /*
    * Creating a new offer.
    */

    'allOffers': function (req, res) {
        'use strict';

        sails.log.info('allOffers');
        sails.log.info(req.headers);
        sails.log.info('---------------');

        var params = req.params.all();
        params.token = req.headers.token;
        params.user_id = req.user_id;

        Categories.userOffers(params, function (err, resOffer) {
            if(err) res.send(400, err);
            if(resOffer){
                if(req.headers.secret_key)
                    return res.send(200, resOffer);
                else{
                    res.view('templates/alloffers' , {data: resOffer.response_data, moment: moment, layout: 'adminLayout'});
                }
            }
        });
    },

    'destroy': function (req, res) {
    'use strict';

        sails.log.info('In destroy function:');
        sails.log.info('In destroy function:');
        sails.log.info('In destroy function:');
        sails.log.info('In destroy function:');
    var params = req.params.all();

        Offers.update({id: req.headers.id},{deletedAt:1}).exec(function (err, offer) {
        if(err) res.send(400, err);
        if(offer){
            res.send(200, offer);
        }
    });

},





};

