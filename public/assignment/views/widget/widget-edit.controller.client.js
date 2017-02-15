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

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
        vm.getEditorTemplateUrl = getEditorTemplateUrl;

        function getEditorTemplateUrl(type) {
            return 'views/widget/widget-'+type+'-editor.view.client.html';
        }
    }
})();