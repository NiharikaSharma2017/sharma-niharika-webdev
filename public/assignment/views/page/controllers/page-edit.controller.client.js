(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            var pageListPromise = PageService.findPagesByWebsiteId(vm.websiteId);
            pageListPromise
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(){
                    console.log("Failed to retrieve Page List");
                });
            var pageRetrievePromise = PageService.findPageById(vm.pageId);
            pageRetrievePromise
                .success(function(page){
                    vm.page = page;
                    vm.name = vm.page.name;
                    vm.description = vm.page.description;
                })
                .error(function(){
                    console.log("Failed to retrieve Page");
                });
        }

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            var pageUpdatePromise = PageService.updatePage(vm.pageId,page);
            pageUpdatePromise
                .success(function(){
                })
                .error(function(){
                    vm.error = "Unable to update Page";
                });
        }

        function deletePage() {
            var answer = confirm("Are you sure?");
            if(answer){
                var pageDeletePromise = PageService.deletePage(vm.pageId);
                pageDeletePromise
                    .success(function(){
                    })
                    .error(function(){
                        vm.error = "Unable to delete Page";
                    });
            }
        }
    }
})();
