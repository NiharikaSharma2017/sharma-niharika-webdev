(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.wid = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
        }
        init();
    }
})();