(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

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
    }
})();
