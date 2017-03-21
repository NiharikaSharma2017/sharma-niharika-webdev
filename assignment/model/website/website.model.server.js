module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };
    return api;


    function deleteWebsite(wid) {
        return WebsiteModel
            .remove({_id : wid});
    }

    function updateWebsite(wid, website){
        return WebsiteModel
            .update({_id : wid},
                {
                    $set: {
                        name : website.name,
                        description: website.description
                    }
                });
    }

    function findWebsiteById(wid){
        return WebsiteModel.findById(wid);
    }


    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({"_user": userId});
    }

    function createWebsiteForUser(uid, website){
        website._user = uid;
        return WebsiteModel.create(website);

    }
};