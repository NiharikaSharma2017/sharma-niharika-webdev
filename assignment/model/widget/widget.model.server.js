var q = require('q');
var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server')();
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
var pageModel = require("../page/page.model.server");

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function deleteWidget(wid){
    var d = q.defer();
    WidgetModel
        .remove({_id: wid}, function (err, widget) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(widget);
            }
        });

    return d.promise;
}

function updateWidget(wgid, widget){
    var d = q.defer();
    WidgetModel
        .update({_id : wgid},
            {
                $set: {
                    name: widget.name,
                    text : widget.text,
                    placeholder : widget.placeholder,
                    description : widget.description,
                    url : widget.url,
                    width : widget.width,
                    height : widget.height,
                    class : widget.class,
                    icon : widget.icon
                }
            }, function (err, widget) {
                if(err) {
                    d.abort(err);
                } else {
                    d.resolve(widget);
                }
            });

    return d.promise;
}

function findWidgetById(wid){
    var d = q.defer();
    WidgetModel
        .findById(wid, function (err, widget) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(widget);
            }
        });

    return d.promise;
}

function findAllWidgetsForPage(pid){
    var d = q.defer();
    pageModel.findAllWidgetsForPage(pid)
        .then(function (widgets, err) {
            if(err){
                d.abort(err);
            }
            else {
                d.resolve(widgets);
            }
        });

    return d.promise;
}

function createWidget(pid, widget){
    var d = q.defer();
    widget._page = pid;
    WidgetModel
        .create(widget, function (err, widget) {
            if(err) {
                d.abort(err);
            } else {
                pageModel.findPageById(pid)
                    .then(function (page) {
                        page.widgets.push(widget);
                        page.save(function (err, data) {
                            if(data) {
                                d.resolve(widget);
                            } else {
                                d.abort(err);
                            }
                        });
                    });
            }
        });
    return d.promise;
}

function reorderWidget(pageId, start, end){
    var d = q.defer();
    pageModel.findPageById(pageId)
        .then(function (page) {
            page.widgets.splice(end, 0, page.widgets.splice(start,1)[0]);
            page.markModified('widgets');
            page.save(function (err, data) {
                if(err) {
                    d.abort(err);
                } else {
                    d.resolve(data);
                }
            });
        });
    return d.promise;
}