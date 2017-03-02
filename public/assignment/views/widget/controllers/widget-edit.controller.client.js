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
            var widgetRetrievePromise = WidgetService.findWidgetById(vm.widgetId);
            widgetRetrievePromise
                .success(function(widget){
                    vm.widget = widget;
                    vm.widgetType = widget.widgetType.toLowerCase();
                    vm.size = widget.size;
                    vm.text = widget.text;
                    vm.url = widget.url;
                    vm.width = widget.width;
                    vm.page = "views/widget/templates/widget-" + vm.widgetType + ".view.client.html";
                })
                .error(function(){
                    console.log("Failed to retrieve Widget");
                });
        }

        init();

        function updateWidget(widget) {
            var newWidget = {}
            var type = vm.widgetType;
            switch(type){
                case "header":
                    newWidget = {"_id": vm.widgetId, "pageId" : vm.pageId, "size" : widget.size, "text" : widget.text, "widgetType" : type.toUpperCase()};
                    break;
                case "youtube":
                    newWidget = {"_id": vm.widgetId, "pageId" : vm.pageId, "width" : widget.width, "widgetType" : type.toUpperCase(), "url" : widget.url};
                    break;
                case "image":
                    newWidget = {"_id": vm.widgetId, "pageId" : vm.pageId, "width" : widget.width, "text" : widget.text, "widgetType" : type.toUpperCase(), "url" : widget.url};
                    break;
            }
            var widgetUpdatePromise = WidgetService.updateWidget(vm.widgetId, newWidget);
            widgetUpdatePromise
                .success(function(){
                })
                .error(function(){
                    vm.error = "Unable to update Widget";
                });
        }

        function deleteWidget() {
            var answer = confirm("Are you sure?");
            if(answer){
                var widgetDeletePromise = WidgetService.deleteWidget(vm.widgetId);
                widgetDeletePromise
                    .success(function(){
                    })
                    .error(function(){
                        vm.error = "Unable to delete Widget";
                    });
            }

        }
    }
})();