/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {



    'checkLogin': function(req, res)
    {
        if(!req.session.user_id){
            res.view('login', {layout: 'layout'});
        } else {
            res.view('templates/dashboard', {layout: 'adminLayout'});
        }
    },



    'postLogin' : function (req, res) {
        'use strict';

        var params = req.params.all();

        params.secret_key = req.headers.secret_key;
        params.api_key = req.headers.api_key;


        Users.userLogin(params, function (err, resUserLogin) {
            if(err) return res.send(400, err);
            if(resUserLogin){
                if(req.headers.secret_key)
                    return res.send(200, resUserLogin);
                else{
                    if(resUserLogin.response_data.userType == 1){
                        req.session.isAdmin = true;
                        req.session.user_id = resUserLogin.response_data.id;
                        req.session.username = resUserLogin.response_data.username;
                        req.session.token = resUserLogin.response_data.token;
                        req.session.image = resUserLogin.response_data.image;
                        req.session.country = resUserLogin.response_data.country;
                        req.session.website = resUserLogin.response_data.website;
                        req.session.gender = resUserLogin.response_data.gender;
                        req.session.createdAt = resUserLogin.response_data.createdAt;
                        res.redirect('/dashboard');
                    } else {
                        req.error = 'Only admin can access these pages';
                        res.view('login', {layout: 'layout'});
                    }

                }
            }
        });
    },
    
    'getUsers': function (req, res) {

        var params = req.params.all();

        var resData = Users.findUsers(params, function (err, resUsers) {
            if(err) return res.send(400, err);
            if(resUsers){
                if(req.headers.secret_key)
                    return res.send(200, resUsers);
                else{
                    res.view('templates/allUsers' , {data: resUsers.response_data, layout: 'adminLayout'});
                }
            }
        });

    },

    'addUsers': function (req, res) {
        'use strict';

        var params = req.params.all();

        Users.addUser(params, function (err, resAddUser) {
            if(err) res.send(400, err);
            if(resAddUser){
                return res.send(200, resAddUser);
            }
        });

    },

    'updateUser': function (req, res) {
        'use strict';

        var params = req.params.all();

        sails.log.info('*********************');
        sails.log.info(params);
        Users.update(params).exec(function (err, user) {
            if(err) res.send(400, err);
            if(user){
                return res.send(200, UtilityServices.resSuccess(user));
            }
        });

    },

    'destroy': function (req, res) {
        'use strict';

        var params = req.params.all();

        Users.update({id: req.headers.user_id}, {deletedAt:1}).exec(function (err, user) {
            if(err) res.send(400, err);
            if(user){
                res.send(200, null);
            }
        });

    },



};

