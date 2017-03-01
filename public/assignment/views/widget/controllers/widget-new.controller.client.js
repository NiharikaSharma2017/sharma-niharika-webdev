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


        vm.createWidget = createWidget;

        function createWidget(widget) {

            switch(widgetType){
                case "header":
                    widget.widgetType = "HEADER";
                    break;
                case "youtube":
                    widget.widgetType = "YOUTUBE";
                    break;
                case "html":
                    widget.widgetType = "HTML";
                    break;
                case "image":
                    widget.widgetType = "IMAGE";
                    break;
                case "text":
                    widget.widgetType = "TEXT";
                    break;
            }

            var createPromise = WidgetService.createWidget(vm.pageId, widget) ;
            createPromise
                .success(function(widget){
                    console.log(widget);
                })
                .error(function(){
                    console.log("Internal Server Error - Unable to add Widget");
                });
        }
    }
})();