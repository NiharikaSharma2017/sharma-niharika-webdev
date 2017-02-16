(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.logout = logout;
        var user = UserService.findUserById(userId);
        if(user != null) {
            vm.user = user;
            vm.id = user._id;
            vm.username = user.username;
            vm.email = user.email;
            vm.firstName = user.firstName;
            vm.lastName = user.lastName;
        }
        else{
            vm.error = "User not found";
        }

        function updateUser(user){
            var updatedUser = UserService.updateUser(userId, user);
            if(updatedUser != null){
                console.log(user);
                vm.message = "User Profile successfully updated.";
            }
            else{
                vm.error = "Unable to update User Profile.";
            }
        }

        function logout() {
            $location.url("/");
        }

    }
})();