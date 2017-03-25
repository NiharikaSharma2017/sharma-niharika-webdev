(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/user/:uid/website/:wid/page/:pid/widget',{
                templateUrl : '/assignment/views/widget/templates/widget-list.view.client.html',
                controller : "WidgetListController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new',{
                templateUrl : '/assignment/views/widget/templates/widget-chooser.view.client.html',
                controller : "NewWidgetController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/search',{
                templateUrl : '/assignment/views/widget/templates/widget-flickr-search.view.client.html',
                controller : "FlickrImageSearchController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new/:type',{
                templateUrl : '/assignment/views/widget/templates/widget-new.view.client.html',
                controller : "NewWidgetController",
                controllerAs : "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid',{
                templateUrl: '/assignment/views/widget/templates/widget-edit.view.client.html',
                controller : "EditWidgetController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();


