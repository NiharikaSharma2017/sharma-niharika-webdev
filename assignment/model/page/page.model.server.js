var q = require('q');
var mongoose = require('mongoose');
var PageSchema = require("./page.schema.server")();
var PageModel = mongoose.model("PageModel", PageSchema);
var websiteModel = require("../website/website.model.server");


PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findAllWidgetsForPage = findAllWidgetsForPage;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function deletePage(pid){
    var d = q.defer();
    PageModel
        .remove({_id: pid}, function (err, page) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(page);
            }
        });

    return d.promise;
}

function updatePage(pid, page){
    var d = q.defer();
    PageModel
        .update({_id : pid},
            {
                $set: {
                    name : page.name,
                    description: page.description
                }
            }, function (err, page) {
                if(err) {
                    d.abort(err);
                } else {
                    d.resolve(page);
                }
            });

    return d.promise;
}

function findPageById (pid){
    var d = q.defer();
    PageModel
        .findById(pid, function (err, page) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(page);
            }
        });

    return d.promise;
}

function findAllPagesForWebsite(wid){
    var d = q.defer();
    PageModel
        .find({"_website": wid}, function (err, pages) {
            if(err) {
                d.abort(err);
            } else {
                d.resolve(pages);
            }
        });

    return d.promise;
}

function findAllWidgetsForPage(pid) {
    var d = q.defer();
    PageModel
        .findById(pid)
        .populate("widgets")
        .exec(function (err, page) {
            if(err){
                d.abort()
            }
            else{
                d.resolve(page.widgets);
            }
        });
    return d.promise;
}

function createPage(websiteId, page){
    var d = q.defer();
    page._website = websiteId;
    PageModel
        .create(page, function (err, page) {
            if(err) {
                d.abort(err);
            } else {
                websiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        website.save(function (err, data) {
                            d.resolve(data);
                        });
                    });
            }
        });
    return d.promise;
}
