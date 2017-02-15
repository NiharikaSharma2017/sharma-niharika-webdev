(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
            vm.widgetType = vm.widget.widgetType;
            switch(vm.widgetType){
                case "Header":
                    vm.name = vm.widget.name;
                    vm.size = vm.widget.size;
                    vm.text = vm.widget.text;
                    break;
                case "YOUTUBE":
                    vm.name = vm.widget.name;
                    vm.text = vm.widget.text;
                    vm.url = vm.widget.url;
                    vm.width = vm.widget.width;
                    break;
                case "IMAGE":
                    vm.name = vm.widget.name;
                    vm.text = vm.widget.text;
                    vm.url = vm.widget.url;
                    break;
            }
            vm.page = "views/widget/widget-" + vm.widgetType + ".editor.view.client.html";
        }

        init();

        function updateWidget(widget, widgetType) {
            var updateWidget = WidgetService.updateWidget(vm.widgetId, widget, widgetType);
            if (updateWidget != null) {
                console.log(widget);
            }
            else {
                console.log("Widget Update Error");
                vm.error = "Widget couldn't be Updated."
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
        }
    }
})();