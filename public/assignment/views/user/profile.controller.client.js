(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        var user = UserService.findUserById(userId);
        console.log(user);
        if(user != null) {
            vm.user = user;
            vm.id = user._id;
        }
        else{
            vm.error = "User not found";
        }

        function updateUser(newUser){
            var updatedUser = UserService.updateUser(userId, newUser);
            if(updatedUser != null){
                vm.message = "User successfully updated";
            }
            else{
                vm.error = "Unable to update User";
            }
        }

        function deleteUser() {
            console.log(vm.id)
            UserService.deleteUser(vm.id);
            $location.url("/user/"+vm.id);
        }
    }
})();
