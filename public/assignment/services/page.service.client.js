(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function WidgetService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        this.findPageByWebsiteId = findPageByWebsiteId;
        this.findPageById = findPageById;
        this.createPage = createPage;
        this.updatePage = updatePage;
        this.deletePage = deletePage;


        function findPageByWebsiteId(websiteId) {
            var websites = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    websites.push(pages[p]);
                }
            }
            return websites;
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
                    pages[p].websiteId = page.websiteId;
                    pages[p].description = page.description;
                    return page;
                }
            }

            return null;
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
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
