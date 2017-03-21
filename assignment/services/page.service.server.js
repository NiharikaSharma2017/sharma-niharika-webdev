module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);


    function createPage(req, res){
        var page = req.body;
        var websiteId = req.params['websiteId'];
        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            });
    }

    function deletePage(req, res){
        var pid = req.params['pageId'];
        pageModel
            .deletePage(pid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }

    function updatePage(req, res){
        var pid = req.params['pageId'];
        var newPage = req.body;
        pageModel
            .updatePage(pid, newPage)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }


    function findPageById(req, res){
        var pid = req.params['pageId'];
        pageModel
            .findPageById(pid)
            .then(
                function(page){
                    res.json(page);
                });
    }

    function findAllPagesForWebsite(req, res){
        var wid = req.params['websiteId'];
        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function (pages) {
                    res.json(pages);
                });
    }


};