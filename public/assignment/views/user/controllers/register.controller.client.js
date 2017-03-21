(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService){
        var vm = this;
        vm.register = register;

        function register(user) {
            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    var oldUser = response.data;
                    if(!oldUser){
                        var newUser = {username: user.username, password: user.password};
                        UserService
                            .createUser(newUser)
                            .then(function(response){
                                var user = response.data;
                                if(user){
                                    $location.url('/profile/' + user._id);
                                }
                                else {
                                    vm.error = "Sorry, could not register";
                                }

                            });
                    }
                });
        }
    }
})();
