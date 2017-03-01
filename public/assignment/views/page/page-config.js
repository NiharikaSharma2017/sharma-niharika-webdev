(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/user/:uid/website/:wid/page',{
                templateUrl : '/assignment/views/page/templates/page-list.view.client.html',
                controller : "PageListController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid/page/new',{
                templateUrl : '/assignment/views/page/templates/page-new.view.client.html',
                controller : "NewPageController",
                controllerAs : "model"

            })
            .when('/user/:uid/website/:wid/page/:pid',{
                templateUrl : '/assignment/views/page/templates/page-edit.view.client.html',
                controller : "EditPageController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();


