(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService){
        var vm = this;
        vm.register = register;

        function register(user){
            UserService.createUser(user);
            $location.url("/profile/" + user._id);
        }
    }
})();
