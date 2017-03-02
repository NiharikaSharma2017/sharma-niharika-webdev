(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            var websiteListPromise = WebsiteService.findWebsitesByUser(vm.userId);
            websiteListPromise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){
                    console.log("Failed to retrieve Website List");
                });
            var websiteRetrievePromise = WebsiteService.findWebsiteById(vm.websiteId);
            websiteRetrievePromise
                .success(function(website){
                    vm.website = website;
                    vm.name = vm.website.name;
                    vm.description = vm.website.description;
                })
                .error(function(){
                    console.log("Failed to retrieve Website");
                });
        }

        init();
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            var websiteUpdatePromise = WebsiteService.updateWebsite(vm.websiteId, website);
            websiteUpdatePromise
                .success(function(){
                })
                .error(function(){
                    vm.error = "Unable to update Website";
                });
        }

            function deleteWebsite() {
                var answer = confirm("Are you sure?");
                if(answer){
                    var websiteDeletePromise = WebsiteService.deleteWebsite(vm.websiteId);
                    websiteDeletePromise
                        .success(function(){
                        })
                        .error(function(){
                            vm.error = "Unable to delete Website";
                        });
                }
            }
    }
})();

