(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController)

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.name = vm.website.name;
            vm.description = vm.website.description;
        }

        init();
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite(website) {
            var updateWebsite = WebsiteService.updateWebsite(vm.websiteId, website);
            if (updateWebsite != null) {
                console.log(website);
            }
            else {
                console.log("Website Update Error");
                vm.error = "Website couldn't be Updated."
            }
        }

            function deleteWebsite() {
                WebsiteService.deleteWebsite(vm.websiteId);
            }
    }
})();

