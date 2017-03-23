module.exports = function() {
    var mongoose = require('mongoose');
    /*
     * Mongoose by default sets the auto_reconnect option to true.
     * We recommend setting socket options at both the server and replica set level.
     * We recommend a 30 second connection timeout because it allows for
     * plenty of time in most operating environments.
     */
    var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

    var mongodbUri = 'mongodb://niharika:niharika101091@ds111529.mlab.com:11529/webdev';

    mongoose.connect(mongodbUri, options);
    var conn = mongoose.connection;

    conn.on('error', console.error.bind(console, 'connection error:'));

    conn.once('open', function() {
        // Wait for the database connection to establish, then start the app.
    });

    var models = {
        userModel: require("./user/user.model.server"),
        websiteModel: require("./website/website.model.server"),
        pageModel : require("./page/page.model.server"),
        widgetModel : require("./widget/widget.model.server")
    };
    return models;
};
