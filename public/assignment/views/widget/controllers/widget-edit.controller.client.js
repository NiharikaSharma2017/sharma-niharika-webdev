(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response){
                    if(response){
                        console.log(response.data);
                        vm.widget = response.data;
                        vm.widgetType = vm.widget.widgetType.toLowerCase();
                        vm.text = vm.widget.text;
                        vm.size = vm.widget.size;
                        vm.url = vm.widget.url;
                        vm.width = vm.widget.width;
                        vm.page = "views/widget/templates/widget-" + vm.widgetType + ".view.client.html";
                    }
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
                case "html":
                    newWidget = {"_id": vm.widgetId, "pageId" : vm.pageId, "size" : widget.size, "text" : widget.text, "widgetType" : type.toUpperCase()};
                    break;
                case "text":
                    newWidget = {"_id": vm.widgetId, "pageId" : vm.pageId, "width" : widget.width, "text" : widget.text, "widgetType" : type.toUpperCase(), "url" : widget.url, "rows" : widget.rows, "placeholder" : widget.placeholder, "formatted" : widget.formatted};
                    break;
            }
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .then(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                    else{
                        vm.error = "Unable to update widget";
                    }
                });
        }

        function deleteWidget() {
            var answer = confirm("Are you sure?");
            if(answer){
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .then(function(response){
                        if(response){
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        }
                        else{
                            vm.error = "Unable to delete widget";
                        }
                    });
            }

        }
    }
})();