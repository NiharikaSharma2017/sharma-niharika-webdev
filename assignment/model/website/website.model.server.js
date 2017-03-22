var q = require('q');
var mongoose = require('mongoose');
var WebsiteSchema = require("./website.schema.server")();
var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
var userModel = require("../user/user.model.server");

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function deleteWebsite(wid) {
    var d = q.defer();
    WebsiteModel
        .remove({_id: wid}, function (err, website) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(website);
            }
        });

    return d.promise;
}

function updateWebsite(wid, website){
    var d = q.defer();
    WebsiteModel
        .update({_id : wid},
            {
                $set: {
                    name : website.name,
                    description: website.description
                }
            }, function (err, website) {
                if(err) {
                    d.abort(err);
                } else {
                    d.resolve(website);
                }
            });

    return d.promise;
}

function findWebsiteById(wid){
    var d = q.defer();
    WebsiteModel
        .findById(wid, function (err, website) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(website);
            }
        });

    return d.promise;
}


function findAllWebsitesForUser(userId) {
    var d = q.defer();
    WebsiteModel
        .find({"_user": userId}, function (err, websites) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(websites);
            }
        });

    return d.promise;
}

function createWebsiteForUser(uid, website){
    var d = q.defer();
    website._user = uid;
    WebsiteModel
        .create(website, function (err, website) {
            if(err) {
                d.abort(err);
            } else {
                userModel.findUserById(uid)
                    .then(function (user) {
                        user.websites.push(website);
                        user.save(function (err, data) {
                            d.resolve(data);
                        });
                    });
            }
        });
    return d.promise;
}