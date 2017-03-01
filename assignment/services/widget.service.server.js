module.exports = function(app){

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
            var widgetId = ((new Date()).getTime() % 1000).toString();
            var upload = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pid, "width": width,
                "url": url, "text": text, "uploaded": true};
            widgets.push(upload);
            res.status(200);
            res.redirect("/assignment"+resurl+"/"+widgetId);
            return;
        }
        else{
            var upload = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pid, "width": width,
                "url": url, "text": text, "uploaded": true};
            for(var w in widgets) {
                if (widgets[w]._id === widgetId) {
                    widgets[w] = upload;
                }
            }
            res.status(200);
            res.redirect("/assignment"+resurl+"/"+widgetId);
            return;
            }
        }


    function createWidget(req, res){
        var pid = req.params['pageId'];
        var newWidget  = req.body;
        newWidget._id = ((new Date()).getTime() % 1000).toString();
        newWidget.pageId = pid;
        widgets.push(newWidget);
        res.json(newWidget);
    }


    function deleteWidget(req,res){
        var wid = req.params['widgetId'];
        for(var w in widgets) {
            if(widgets[w]._id === wid) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function updateWidget(req, res) {
        var wid = req.params['widgetId'];
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id === wid) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function findWidgetById(req,res){
        var wid = req.params['widgetId'];
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === wid ) {
                res.send(widget);
                return;
            }
        }
        res.sendStatus(404).send({});
    }


    function findAllWidgetsForPage(req,res){
        var pid = req.params['pageId'];
        console.log(pid);
        var widgetList = [];
        for(var w in widgets) {
            if(pid === widgets[w].pageId) {
                widgetList.push(widgets[w]);
            }
        }
        res.json(widgetList);
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