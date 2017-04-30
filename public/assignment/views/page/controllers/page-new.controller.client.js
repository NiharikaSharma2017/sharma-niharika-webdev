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
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.pages = response.data;
                });
        }
        init();
        function createPage (page) {
            var newPage = {name: page.name, description: page.description};
            PageService.createPage(vm.websiteId, newPage)
            .then(function(response){
                    var page = response.data;
                    if(page.name){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                    }
                    else {
                        vm.error = "Sorry, unable to create page";
                    }
            });
        }
    }
})();