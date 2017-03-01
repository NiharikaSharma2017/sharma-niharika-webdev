(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var api = {
            "createUser": createUser,
            "updateUser": updateUser,
            "logout": logout,
            "deleteUser": deleteUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById
        };
        return api;

        function createUser(user){
            var url = '/api/user';
            return $http.post(url, user);
        }

        function updateUser(newUser) {
            var url = "/api/user/" + newUser._id;
            return $http.put(url, newUser);
        }

        function deleteUser(userId){
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function logout(){
            return $http.post("/api/logout");
        }

    }
})();
