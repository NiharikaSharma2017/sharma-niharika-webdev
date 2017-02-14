(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController)

    function EditPageController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();
    }
})();
