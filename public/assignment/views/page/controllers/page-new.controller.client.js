(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

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
        function createPage (page) {
            var createPromise = PageService.createPage(vm.websiteId,page);
            createPromise
                .success(function(page){
                    console.log(page);
                })
                .error(function(){
                    console.log("Internal Server Error - Unable to add Page");
                });

        }
    }
})();

