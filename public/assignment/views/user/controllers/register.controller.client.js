(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, $rootScope, UserService){
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.password1 === user.password2){
                UserService
                    .register(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            if (user!="0"){
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            }
                        });

            }else {
                vm.error = "Passwords do not match.";
            }
        }
    }
})();
