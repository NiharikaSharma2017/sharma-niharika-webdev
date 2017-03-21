module.exports = function(){

    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api =
        {
            createWidget : createWidget,
            findAllWidgetsForPage : findAllWidgetsForPage,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
            // reorderWidget: reorderWidget
        };
    return api;



    function deleteWidget(wid){
        return WidgetModel
            .remove({_id : wid});
    }

    function updateWidget(wgid, widget){
        return WidgetModel
            .update(
                {_id : wgid},
                {
                    name: widget.name,
                    text : widget.text,
                    placeholder : widget.placeholder,
                    description : widget.description,
                    url : widget.url,
                    width : widget.width,
                    height : widget.height,
                    // rows : widget.rows,
                    // size : widget.size,
                    class : widget.class,
                    icon : widget.icon
                    // deletable : widget.deletable,
                    // formatted : widget.formatted
                }
            )
    }

    function findWidgetById(wid){
        return WidgetModel.findById(wid);
    }

    function findAllWidgetsForPage(pid){
        return WidgetModel.find({"_page": pid});
    }

    function createWidget(pid, widget){
        widget._page = pid;
        return WidgetModel.create(widget);
    }

    // function reorderWidget(pageId, start, end){
    //
    //
    // }
};