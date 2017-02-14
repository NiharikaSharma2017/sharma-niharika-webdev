(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log(user.username, user.password);
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if (loginUser){
                $location.url("/profile/" + loginUser._id);
            }
            else{
                vm.error = "Unable to Login. Check your Username or Password.";
            }
        }
    }
})();
