(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;

        function init() {
            var widgetListPromise = WidgetService.findWidgetsByPageId(vm.pageId);
            widgetListPromise
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(){
                    console.log("Failed to retrieve Widget List");
                });
        }

        init();

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var raw_id = urlParts[urlParts.length - 1];
            var id = raw_id.slice(8);
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();

