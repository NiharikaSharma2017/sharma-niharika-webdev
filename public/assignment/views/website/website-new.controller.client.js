(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
        vm.createWebsite = createWebsite;
        function createWebsite (website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();
