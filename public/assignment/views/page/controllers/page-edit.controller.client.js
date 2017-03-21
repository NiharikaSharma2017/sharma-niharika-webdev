(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($routeParams, $location, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function(response){
                    vm.pages = response.data;
                });

            PageService.findPageById(vm.pageId)
                .then(function(response){
                    if(response){
                        vm.page = response.data;
                        vm.name = vm.page.name;
                        vm.description = vm.page.description;
                    }
                });
        }

        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                    else{
                        vm.error = "Unable to update page";
                    }
                });
        }

        function deletePage() {
            var answer = confirm("Are you sure?");
            if(answer){
                PageService
                    .deletePage(vm.pageId)
                    .then(function(response){
                            if(response){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                            }
                            else{
                                vm.error = "Unable to delete page";
                            }
                        });
            }
        }
    }
})();
