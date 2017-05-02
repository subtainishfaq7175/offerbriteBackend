/**
 * Categories.js
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
    status: {
      type : 'INTEGER'
    },
    created_by: {
      type : 'INTEGER'
    },
      'Offers': {
      collection: 'Offers',
        via: 'categoryId'
      }
  },




  'userOffers': function (params, callback) {
    'use strict';

    var arrRecords = [];


    var sql = "SELECT categories.id, offers.description, ";
    sql += "offers.banner, offers.id as offer_id, offers.categoryId, offers.startDate, offers.endDate, offers.starthours, offers.EndHours, offers.additionalInformation, ";
    sql += "offers.created_by, offers.is_public, offers.createdAt, offers.updatedAt, ";
    sql += "categories.title as catTitle, offers.title, offers.id as offersIds, count(likes.id) as totalLikes, (select count(*) from follows where offer_id = offers.id) as totalFollows ";
    sql += "FROM offers ";
    sql += "INNER JOIN categories ON offers.categoryId = categories.id ";
    sql += "LEFT JOIN likes ON offers.id = likes.offer_id ";
    sql += "LEFT JOIN userinterests ON userinterests.catogery_id = categories.id ";
    sql += "WHERE offers.deletedAt IS NULL ";
    sql += "GROUP BY offers.id ";
    sql += "ORDER BY userinterests.catogery_id DESC ";


    var valuesToEscape = "";

    this.query(sql, valuesToEscape, function(err, rawResult) {


      var titles = [];
      var arrTemp = [];
      var values = [];
      if (rawResult ) {


        var ctr = 0;
        var ctr2 = 0;

        rawResult.forEach(function(element, index, array){
          if(titles.indexOf(element.catTitle) == -1){
            titles.push(element.catTitle);
          }
        });

        titles.forEach(function(title, index, array){

          values = [];

          rawResult.forEach(function(offer, index2, array2){

            if(title == offer.catTitle){
                values.push(offer);
            }

            ctr2++;
            if (ctr2 === array2.length) {
              return;
            }
          });

          arrTemp.push({catTitle : title, Offers : values});

            ctr++;
            if (ctr === array.length) {
              callback(null, UtilityServices.resSuccess(arrTemp));
            }

        });

      } else callback(UtilityServices.resSuccess("S002"), null);
    });

  },




};

