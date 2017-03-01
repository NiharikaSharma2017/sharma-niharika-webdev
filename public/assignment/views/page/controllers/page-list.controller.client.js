(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            var pageListPromise = PageService.findPagesByWebsiteId(vm.websiteId);
            pageListPromise
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){
                    console.log("Failed to retrieve Page List");
                });
        }
        init();
    }
})();