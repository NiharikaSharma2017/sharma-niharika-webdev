module.exports = function() {
    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage : createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage
    };

    return api;

    function deletePage(pid){
        return PageModel
            .remove({_id:pid});
    }

    function updatePage(pid, page){
        return PageModel
            .update({_id : pid},
                {
                    $set: {
                        name : page.name,
                        description: page.description
                    }
                });
    }

    function findPageById (pid){
        return PageModel.findById(pid);
    }

    function findAllPagesForWebsite(wid){
        return PageModel.find({"_website": wid});
    }

    function createPage(websiteId, page){
        page._website = websiteId;
        return PageModel.create(page);
    }

};