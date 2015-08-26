'use strict';

angular.module('songzaDlApp', [])
.value('youtubeConfig', {
  'url': 'https://www.googleapis.com/youtube/v3/search',
  'key': 'YOUR_API_KEY'
})
// Weather Controller
.controller('YoutubeController', ['$scope', '$http', 'youtubeConfig', function YoutubeController($scope, $http, youtubeConfig) {

  var getYoutubeData = function (info){

    $scope.isPending = false;
    $scope.fetchError = false;
    $scope.loadError = false;

    if (info.title && info.artist) {

      $scope.isPending = true;

      $http.get(youtubeConfig.url, { 
          params: {
            part: 'snippet',
            q: info.title + ' ' + info.artist,
            key: youtubeConfig.key
          }
      }).
      success(function (data) {
        console.log(data);
        $scope.isPending = false;
        $scope.items = data.items;
      }).
      error(function () {
        $scope.isPending = false;
        $scope.fetchError = true;
      });

    } else {

      $scope.loadError = true;
      $scope.$apply();

    }
  };

  $scope.download = function (videoId) {
    console.log('Download ' + videoId);
    // @todo perform a download action
  };

  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      /* ...and send a request for the DOM info... */
      chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        /* ...also specifying a callback to be called 
         *    from the receiving end (content script) */
        getYoutubeData);
  });
}]);