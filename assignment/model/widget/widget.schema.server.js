module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page : {type : mongoose.Schema.Types.ObjectId , ref : 'PageModel'},
        name: String,
        text : String,
        widgetType : {type: String , enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        placeholder : String,
        description : String,
        url : String,
        width : String,
        height : String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        deletable : Boolean,
        formatted : Boolean,
        dateCreated : {type: Date, default: Date.now}
    }, {collection : "widget"});
    return WidgetSchema;
};