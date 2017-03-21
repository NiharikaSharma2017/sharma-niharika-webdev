module.exports = function(app) {
    // console.log("Hello from User Model!!!");
    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserById(id) {
        return UserModel.findById(id);
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function updateUser(id, user) {
        return UserModel.update(
            {_id: id},
            {
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        );
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};