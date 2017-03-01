module.exports = function(app, model) {

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(req, res){
        var newPage = req.body;
        newPage._id = ((new Date()).getTime() % 1000).toString() + "";
        newPage.websiteId = req.params['websiteId'];
        pages.push(newPage);
        res.json(newPage);

    }

    function deletePage(req, res){
        var pid = req.params['pageId'];
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }

    function updatePage(req, res){
        var pid = req.params['pageId'];
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);

    }


    function findPageById(req,res){
        var pid = req.params['pageId'];
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pid ) {
                res.send(page);
                return;
            }
        }
        res.sendStatus(404).send({});


    }

    function findAllPagesForWebsite(req, res){
        var wid = req.params['websiteId'];
        console.log(wid);
        var pageList = [];
        for(var p in pages) {
            if(wid === pages[p].websiteId) {
                pageList.push(pages[p]);
            }
        }
        res.json(pageList);

    }

}