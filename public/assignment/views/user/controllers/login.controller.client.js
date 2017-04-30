(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        if (user!="0"){
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        }
                        else{
                            vm.error = "Username or Password incorrect";
                        }
                    });
        }
    }
})();