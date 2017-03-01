(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            var loginPromise = UserService.findUserById(userId);
            loginPromise
                .success(function (response) {
                    var loginUser = response;
                    if (loginUser != null) {
                        vm.user = loginUser;
                    }
                    else {
                        vm.error = "User not found";
                    }
                })
                .error(function(){
                    vm.error = "User not found";
                });
        }

        init();

        function updateUser(user){
            var updatePromise = UserService.updateUser(user);
            updatePromise
                .success(function(response){
                    vm.message = "User successfully updated";
                })
                .error(function(){
                    vm.error = "Unable to update User";
                });
        }

        function logout(){
            UserService
                .logout()
                .success(function(){
                    $location.url("/");
                })
        }


        function deleteUser(user){
            var answer = confirm("Are you sure?");
            if(answer){
                var deletePromise = UserService.deleteUser(user._id);
                deletePromise
                    .success(function(){
                        $location.url("/login");
                    })
                    .error(function(){
                        vm.error = "Unable to delete User";
                    });
            }
        }

    }
})();