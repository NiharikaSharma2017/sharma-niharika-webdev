(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        function init() {
            var websiteListPromise = WebsiteService.findWebsitesByUser(vm.userId);
            websiteListPromise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){
                    console.log("Failed to retrieve Website List");
                });
        }
        init();
        function createWebsite (website) {
            var createPromise = WebsiteService.createWebsite(vm.userId, website);
            createPromise
                .success(function(website){
                    console.log(website);
                })
                .error(function(){
                    console.log("Internal Server Error - Unable to add Website");
                });
        }
    }
})();
