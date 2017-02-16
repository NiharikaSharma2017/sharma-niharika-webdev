(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetType = $routeParams.type;
        vm.page = "views/widget/templates/widget-" + vm.widgetType + ".view.client.html";


        vm.createWidget = createWidget;

        function createWidget(widget) {
            WidgetService.createWidget(vm.pageId, widget, vm.widgetType) ;
            console.log(widget);
        }
    }
})();