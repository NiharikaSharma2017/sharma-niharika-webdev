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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
            vm.name = vm.page.name;
            vm.description = vm.page.description;
        }

        init();
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            var updatePage = PageService.updatePage(vm.pageId,page);
            if (updatePage != null) {
                console.log(page);
            }
            else {
                console.log("Page Update Error");
                vm.error = "Page couldn't be Updated."
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }
})();
