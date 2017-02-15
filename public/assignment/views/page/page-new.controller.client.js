(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
            console.log(vm.pages);
        }
        init();
        vm.createPage = createPage;

        function createPage (page) {
            PageService.createPage(vm.wid,page);
        };
    }
})();

