(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "f054d92da0a38c25f3d80f717adb97a3";
    var secret = "179fe73337c5aa6b";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;

        function searchPhotos(text) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", text);
            return $http.get(url);
        }
    }
})();