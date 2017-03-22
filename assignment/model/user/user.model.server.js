var q = require('q');
var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server')();
var UserModel = mongoose.model("UserModel", UserSchema);

UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

module.exports = UserModel;

function findUserById(uid) {
    var d = q.defer();
    UserModel
        .findById(uid, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function findUserByCredentials(username, password) {
    var d = q.defer();
    UserModel
        .findOne({
            username: username,
            password: password
        }, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function findUserByUsername(username) {
    var d = q.defer();
    UserModel
        .findOne({
            username: username
        }, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function createUser(user) {
    var d = q.defer();
    UserModel
        .create(user, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function updateUser(id, user) {
    var d = q.defer();
    UserModel
        .update({_id: id},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}

function deleteUser(userId) {
    var d = q.defer();
    UserModel
        .remove({_id: userId}, function (err, user) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(user);
            }
        });

    return d.promise;
}