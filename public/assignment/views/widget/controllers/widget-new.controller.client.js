(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService) {
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

            var createPromise = WidgetService.createWidget(vm.pageId, myWidget) ;
            createPromise
                .success(function(widget){
                    console.log(widget);
                })
                .error(function(){
                    console.log("Internal Server Error - Unable to create Widget");
                });
        }
    }
})();
