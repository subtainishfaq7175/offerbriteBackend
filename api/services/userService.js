/**
 * Created by VirtualB on 4/18/2017.
 */



module.exports = {

    'strRandom': function (cases, startInteger, endInteger) {
    'use strict';

        switch(cases){
            case 1:
                var strDateTime = new Date();
                var srtToken = strDateTime.getTime() + "_" + Math.random(startInteger, endInteger);
                return srtToken;
            break;

            default: return 0;
        }


    },



};