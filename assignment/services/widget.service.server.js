module.exports = function(app, models){

    var widgetModel = models.widgetModel;
    var fs = require('fs');
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/page/:pageId/widget', sort);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://3.bp.blogspot.com/-EGKf--ovXS4/UkgfFLd8D1I/AAAAAAAAZKE/i_XX8xQASgs/s1600/earth-in-space-hd-wallpaper.jpg"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/watch?v=c8aFcHFu8QM" },
    ];


    function uploadImage(req, res) {
        var text = req.body.text;
        var pid = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var resurl = req.body.resUrl;
        var myFile = req.file;
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        var url = "/uploads/" + filename;
        if(widgetId === ""){
            var upload = {"widgetType": "IMAGE", "_page": pid, "width": width,
                "url": url, "text": text, "uploaded": true};
            widgetModel
                .createWidget(pid, upload)
                .then(function (widget) {
                    res.redirect("/assignment"+resurl+"/"+widget._id);
                });
            return;
        }
        else{
            var upload = { "_id": widgetId, "widgetType": "IMAGE", "_page": pid, "width": width,
                "url": url, "text": text, "uploaded": true};
            widgetModel
                .updateWidget(widgetId, upload)
                .then(
                    function(status){
                        res.redirect("/assignment"+resurl+"/"+widgetId);
                    },
                    function(error){
                        res.sendStatus(400).send(error);

                    });
            return;
            }
        }


    function createWidget(req, res){
        var pid = req.params['pageId'];
        var newWidget  = req.body;
        widgetModel
            .createWidget(pid, newWidget)
            .then(function (widget) {
                res.json(widget);
            });
    }


    function deleteWidget(req, res){
        var wid = req.params['widgetId'];
        widgetModel
            .deleteWidget(wid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }


    function updateWidget(req, res) {
        var wid = req.params['widgetId'];
        var widget = req.body;
        widgetModel
            .updateWidget(wid, widget)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);

                });
    }


    function findWidgetById(req,res){
        var wid = req.params['widgetId'];
        widgetModel
            .findWidgetById(wid)
            .then(
                function(widget){
                    res.json(widget);
                });
    }


    function findAllWidgetsForPage(req,res){
        var pid = req.params['pageId'];
        widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function (widgets) {
                    res.json(widgets);
                });
    }

    function sort(req, res){
        var query = req.query;
        var initial = query.initial;
        var final = query.final;
        widgets.splice(final, 0, widgets.splice(initial,1)[0]);
        // console.log(widgets);
        res.sendStatus(200);
    }
};