(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var  loginUser = response.data;
                    if (loginUser){
                        $location.url("/profile/" + loginUser._id);
                    }
                    else {
                        vm.error = "Unable to Login. Check your Username or Password.";
                    }
            });
        }
    }
})();