/**
 * Offers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'STRING'
    },
    description : {
      type: 'STRING'
    },
    banner : {
      type: 'STRING'
    },
    categoryId : {
      model: 'Categories'
    },
    startDate: {
      type : 'date'
    },
    endDate: {
      type : 'date'
    },
    starthours: {
      type : 'string'
    },
    EndHours: {
      type : 'string'
    },
    additionalInformation: {
      type : 'string'
    },
    created_by: {
      type : 'INTEGER'
    },
    is_public : {
      type : 'INTEGER',
      defaultsTo: 1
    },
    'Likes' : {
      collection: 'likes',
      via: 'offer_id'
    },
    'Follows' : {
      collection: 'Follows',
      via: 'offer_id'
    },
      deletedAt:{
          type:'boolean'
      }





  },

  'getOffer' : function (params, callback) {
  'use strict';

    this.findOne({
      where: { is_public : 1, id: params.id}
    })
        .populate('Likes')
        .populate('Follows')
        .exec(function (err, resData) {

            if((resData.Likes).length > 0){
                if(resData.Likes){
                    resData.totalLikes = resData.Likes.length;

                } else {
                    resData.totalLikes = 0;
                }
            }
            if((resData.Follows).length>0){
                if(resData.Follows){
                    resData.totalFollows = resData.Follows.length;
                } else {
                    resData.totalFollows = 0;
                }
            }

            resData.isLiked = false;
            resData.isfollowed = false;


        if (resData) callback(null, UtilityServices.resSuccess(resData));

        else callback(UtilityServices.resSuccess("S002"), null);


    });

  },


  'getOffers' : function (params, callback) {
  'use strict';

      Offers.find({
          where: { is_public : 1 }
      })
          .populate('Likes')
          .populate('Follows')
          .exec(function (err, resData) {
              if (resData.length > 0){

                  var ctr = 0;
                  resData.forEach(function(value, key, total){

                      resData[key].isLiked = false;
                      resData[key].isFollowed = false;

                      if(params.user_id) {
                          async.forEachOf(resData[key].Likes, function (like, key2, cb) {

                              if (like.user_id == params.user_id && like.is_liked == 1) {
                                  resData[key].isLiked = true;
                              }

                              cb();
                          });

                          async.forEachOf(resData[key].Follows, function (follow, key3, cb2) {

                              if (follow.user_id == params.user_id  && follow.is_followed == 1) {
                                  resData[key].isFollowed = true;
                              }

                              cb2();
                          });
                      }





                      resData[key].totalLikes = resData[key].Likes.length;
                      resData[key].totalFollows = resData[key].Follows.length;
                      ctr++;
                      if (ctr === total.length) {
                          resData.Likes = 0;
                          resData.Follows = 0;
                          callback(null, UtilityServices.resSuccess(resData));
                      }
                  });

                 /* resData.Likes = 0;
                  resData.Follows = 0;

                  callback(null, UtilityServices.resSuccess(resData));*/
              }
              else callback(UtilityServices.resSuccess("S002"), null);

          });

  },

  /*
  *
  */

  'addNew' : function (params, callback) {
    'use strict';

    this.create(params).exec(function (err, offer) {

      if (offer) callback(null, UtilityServices.resSuccess(offer));
      else callback(UtilityServices.resSuccess("E005"), null);

    });

  },

    /*
    User offers are.
     */

    /*'userOffers': function (params, callback) {
        'use strict';

        var arrRecords = [];

        Offers.find({
            where: { is_public : 1},

        })
            .populate('Likes')
            .populate('Follows')
            .sort('categoryId DESC')
            .exec(function (err, resData) {
                if (resData ) {


                    async.forEachOf(resData, function (value, key, callback) {
                        resData[key].totalLikes = resData[key].Likes.length;
                        resData[key].totalFollows = resData[key].Follows.length;


                        if(value.categoryId == )
                        callback();
                    });


                    Userinterests.find({
                        where: {
                            user_id: params.user_id
                        }
                    }).exec(function (err, resIntrests) {

                        async.forEachOf(resIntrests, function (value, key, callback) {

                            Categories.find({
                                where: {
                                    id: value.catogery_id
                                }
                            }).exec(function (err, resCategory) {


                            });

                            sails.log.info('***************************************');
                            sails.log.info(resData);
                            sails.log.info('***************************************');
                            callback();
                        });


                        callback(null, UtilityServices.resSuccess(resData));


                    });
                }
                else callback(UtilityServices.resSuccess("S002"), null);
            });
    },*/

    'userLikedOffers': function (params, callback) {
        'use strict';

        Likes.find({
            select: ['offer_id'],
            where:{ user_id: params.user_id}}).exec(function (err, resLikes) {
            if (resLikes) {

                var offers = '';
                async.forEachOf(resLikes,function(value, key, callback){
                    if(key == resLikes.length - 1)
                        offers += value.offer_id;
                    else
                        offers += value.offer_id+',';

                    callback();
                });

        Offers.find({
            where: { is_public : 1, id: offers.split(',') }
        })
            .populate('Likes')
            .populate('Follows')
            .sort('categoryId DESC')
            .exec(function (err, resData) {
                if (resData ){

                    async.forEachOf(resData,function(value, key, callback){
                        resData[key].totalLikes = resData[key].Likes.length;
                        resData[key].totalFollows = resData[key].Follows.length;
                        callback();
                    });

                    resData.Likes = 0;
                    resData.Follows = 0;

                    callback(null, UtilityServices.resSuccess(resData));

                }
                else callback(UtilityServices.resSuccess("S002"), null);
            });
            }
        });


    }



};

