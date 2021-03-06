(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/user/:uid/website',{
                templateUrl: '/assignment/views/website/templates/website-list.view.client.html',
                controller : "WebsiteListController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/new',{
                templateUrl : '/assignment/views/website/templates/website-new.view.client.html',
                controller : "NewWebsiteController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid',{
                templateUrl : "/assignment/views/website/templates/website-edit.view.client.html",
                controller : "EditWebsiteController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();

