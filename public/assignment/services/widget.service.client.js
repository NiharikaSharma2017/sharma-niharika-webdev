(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "https://3.bp.blogspot.com/-EGKf--ovXS4/UkgfFLd8D1I/AAAAAAAAZKE/i_XX8xQASgs/s1600/earth-in-space-hd-wallpaper.jpg"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/c8aFcHFu8QM" },
            ];

        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var pageWidgets = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    pageWidgets.push(widgets[w]);
                }
            }
            return pageWidgets;
        }


        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId, widget, widgetType) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    switch(widgetType){
                        case "HEADER":
                            widgets[w].size = widget.size;
                            widgets[w].text = widget.text;
                            return widget;
                            break;
                        case "YOUTUBE":
                            widgets[w].text = widget.text;
                            widgets[w].url = widget.url;
                            widgets[w].width = widget.width;
                            return widget;
                            break;
                        case "IMAGE":
                            widgets[w].text = widget.text;
                            widgets[w].url = widget.url;
                            return widget;
                            break;
                    }
                }
            }

            return null;
        }

        function createWidget(pageId, widget, widgetType) {
            widget.widgetType = widgetType.toUpperCase();
            widget.pageId = pageId;
            widget._id = ((new Date()).getTime() % 1000).toString();
            widgets.push(widget);
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }
    }
})();
