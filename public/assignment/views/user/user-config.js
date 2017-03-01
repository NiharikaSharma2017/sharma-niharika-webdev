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
            .otherwise({
                redirectTo: '/'
            });
    }
})();
