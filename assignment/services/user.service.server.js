module.exports = function (app, models) {

    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID        : "1877292112486255",
        clientSecret    : "ac82d91d1881f2109b9ce8da80c9d60c",
        callbackURL     : "http://localhost:3000/auth/facebook/callback"
    };
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var googleConfig = {
        clientID     : "589944357076-6dstuu0k662f7h8vg2u0a0mglf6pimnk.apps.googleusercontent.com",
        clientSecret : "5PzHFbBwJmjm0fRTTox9I16V",
        callbackURL  : "http://localhost:3000/auth/google/callback"
    };

    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    var userModel = models.userModel;
    app.get('/api/user', findUser);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));
    app.post('/api/logout', logout);



    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                });
    }


    function facebookStrategy(token, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        console.log(user);
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;
        if (Object.getOwnPropertyNames(user).length != 0) {
            userModel
                .createUser(user)
                .then(function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                });
        }else {
            res.sendStatus(400);
        }
    }


    function deleteUser(req, res) {
        var userId = req.params['userId'];
        userModel
            .deleteUser(userId)
            .then(
                    function(status) {
                        res.send(200);
                    },
                    function(error) {
                        res.statusCode(404).send(error);
                    });
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                });
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function(newUser){
                    res.send(newUser);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }
};