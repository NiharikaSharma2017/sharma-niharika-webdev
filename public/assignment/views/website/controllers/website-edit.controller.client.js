(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(response){
                    vm.websites = response.data;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response){
                    if(response){
                        vm.website = response.data;
                        vm.name = vm.website.name;
                        vm.description = vm.website.description;
                    }
                });
        }

        init();
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website");
                    }
                    else{
                        vm.error = "Unable to update Website";
                    }
                });
        }

            function deleteWebsite() {
                var answer = confirm("Are you sure?");
                if(answer){
                    WebsiteService
                        .deleteWebsite(vm.websiteId)
                        .then(function(response){
                            if(response){
                                $location.url("/user/"+vm.userId+"/website");
                            }
                            else{
                                vm.error = "Unable to delete Website";
                            }
                        });
                }
            }
    }
})();

