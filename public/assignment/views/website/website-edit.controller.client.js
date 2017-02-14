(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();
        vm.editWebsite = editWebsite;
        vm.deleteWebsite = deleteWebsite;

        function editWebsite(website) {
            var updateWebsite = WebsiteService.updateWebsite(vm.websiteId, website);
            if (updateWebsite != null) {
                vm.message = "Website successfully Updated."
            }
            else {
                console.log("Website Update Error");
                vm.alert = "Website couldn't be Updated."
            }

            function deleteWebsite() {
                WebsiteService.deleteWebsite(vm.websiteId);
                // $location.url("/user/"+vm.userId+"/website");
            }
        }
    }
})();

