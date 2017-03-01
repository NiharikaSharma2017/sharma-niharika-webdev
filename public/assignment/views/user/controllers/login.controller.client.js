(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var loginPromise = UserService.findUserByCredentials(user.username, user.password);
            loginPromise
                .success(function (response) {
                    var  loginUser = response;
                    if (loginUser){
                        $location.url("/profile/" + loginUser._id);
                    }
                    else {
                        vm.error = "Unable to Login. Check your Username or Password.";
                    }
            })

                .error(function(err) {
                    vm.error = "Unable to Login. Check your Username or Password.";
                });
        }
    }
})();