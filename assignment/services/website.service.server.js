module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.post('/api/user/:userId/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);


    function findAllWebsitesForUser(req, res) {
        var userId = req.params['userId'];
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.params['userId'];
        var website = req.body;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(website) {
                    res.json(website);
                }
            );
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                }
            );
    }

    function updateWebsite(req, res) {
        var wid = req.params['websiteId'];
        var website = req.body;
        websiteModel
            .updateWebsite(wid, website)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                }
            );
    }

    function deleteWebsite(req, res) {
        var wid = req.params['websiteId'];
        websiteModel
            .deleteWebsite(wid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                }
            );
    }


}
