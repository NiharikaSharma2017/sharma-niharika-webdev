(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : '/assignment/views/user/templates/login.view.client.html',
                controller : "LoginController",
                controllerAs : "model"
            })
            .when('/login',{
                templateUrl : '/assignment/views/user/templates/login.view.client.html',
                controller : "LoginController",
                controllerAs : "model"
            })
            .when('/register',{
                templateUrl : '/assignment/views/user/templates/register.view.client.html',
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when("/profile/:uid",{
                templateUrl: '/assignment/views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })

            .when ("/user", {
                templateUrl: "/assignment/views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            .when('/user/:uid', {
                templateUrl: '/assignment/views/user/templates/profile.view.client.html',
                controller : "ProfileController",
                controllerAs : "model",
                resolve: { loggedin: checkLoggedin }
            })

            .otherwise({
                redirectTo: '/'
            });

        function checkLoggedin($q, UserService, $location){
            var deferred = $q.defer();
            UserService
                .loggedin()
                .success(function(user) {
                    if (user !== '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url('/');
                    }
                });
            return deferred.promise;
        }
    }
})();
