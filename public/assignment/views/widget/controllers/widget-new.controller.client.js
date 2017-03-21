(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        var widgetType = $routeParams.type;
        vm.page = "views/widget/templates/widget-" + widgetType + ".view.client.html";

        vm.buildWidget = buildWidget;
        function buildWidget(widget) {
            var myWidget = {};
            switch(widgetType){
                case "header":
                    myWidget = {"size":widget.size, "text":widget.text,"widgetType": "HEADER"};
                    break;
                case "youtube":
                    myWidget = {"width":widget.width, "text":widget.text,"widgetType": "YOUTUBE", "url":widget.url};
                    break;
                case "image":
                    myWidget = {"width":widget.width, "text":widget.text,"widgetType": "IMAGE", "url":widget.url};
                    break;
            }

            WidgetService
                .createWidget(vm.pageId, myWidget)
                .then(function(response){
                    if(response){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                    else{
                        vm.error = "Unable to create widget";
                    }
                });
        }
    }
})();
