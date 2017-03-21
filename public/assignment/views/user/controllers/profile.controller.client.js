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
            UserService
                .findUserById(userId)
                .then(function(response){
                        vm.user = response.data;
                });
        }

        init();

        function updateUser(user){
            UserService
                .updateUser(user)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    }
                )
        }


        function deleteUser(user){
            var answer = confirm("Are you sure?");
            if(answer){
                UserService
                    .deleteUser(user._id)
                    .then(
                        function(){
                            $location.url("/login");
                        },
                        function() {
                            vm.error = "Unable to remove user"
                        }
                    );
            }
        }

    }
})();