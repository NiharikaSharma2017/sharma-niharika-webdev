module.exports = function(app) {

    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.post('/api/user/:userId/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function findAllWebsitesForUser(req, res) {
        var userId = req.params['userId'];
        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite._id = ((new Date()).getTime() % 1000).toString() + "";
        newWebsite.developerId = req.params['userId'];
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findWebsiteById(req,res) {
        var wid = req.params['websiteId'];
        for(var w in websites) {
            var website = websites[w];
            if( website._id === wid ) {
                res.send(website);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updateWebsite(req, res) {
        var wid = req.params['websiteId'];
        var website = req.body;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        var wid = req.params['websiteId']
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


}