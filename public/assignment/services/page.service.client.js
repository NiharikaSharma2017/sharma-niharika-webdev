(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "createPage": createPage,
            "updatePage": updatePage,
            "deletePage": deletePage,
        };
        return api;

        function findPagesByWebsiteId(websiteId) {
            var websitePages = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    websitePages.push(pages[p]);
                }
            }
            return websitePages;
        }


        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return page;
                }
            }

            return null;
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = ((new Date()).getTime() % 1000).toString();
            pages.push(page);
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
    }
})();
