module.exports = function (app, models) {

    var userModel = models.userModel;
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/logout', logout);

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
                    }
                );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(newUser){
                    res.send(newUser);
                },
                function(error){
                    res.sendStatus(400).send(error);

                }
            );
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

                }
            );
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

                }
            );
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
                    res.send(user);
                },
                function(error){
                    res.sendStatus(400).send(error);

                }
            );
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

                }
            );
    }

    function logout(req, res){
        res.redirect('/');
    }
};