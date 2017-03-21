(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function(response){
                    vm.websites = response.data;
                });
        }
        init();

        function createWebsite (website) {
            var newWebsite = {name: website.name, description: website.description};
            WebsiteService
                .createWebsite(vm.userId, newWebsite)
                .then(function(response){
                    var website = response.data;
                    if(website){
                        $location.url("/user/"+vm.userId+"/website");
                    }
                    else {
                        vm.error = "Sorry, unable to create website";
                    }

                });
        }

    }
})();
