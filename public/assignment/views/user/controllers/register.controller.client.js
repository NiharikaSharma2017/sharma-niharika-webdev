(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService){
        var vm = this;
        vm.register = register;

        function register(user) {
            var exists = UserService.findUserByUsername(user.username);
            exists
                .success(function (user) {
                    vm.error = "Sorry, that username is already taken"
                })
                .error(function(){
                    var promise = UserService.createUser(user);
                    promise
                        .success(function(user){
                            $location.url('/profile/' + user._id);
                        })
                        .error(function () {
                            vm.error = "Sorry, could not register";
                        });
                });
        }
    }
})();
