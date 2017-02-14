(function(){
    angular
        .module("WebAppMaker")
        .controller("ListWebsiteController", ListWebsiteController);

    function ListWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }
})();
