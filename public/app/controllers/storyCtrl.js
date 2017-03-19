var storyCtrl = angular.module("storyCtrl", ["storyService"]);

storyCtrl.controller("StoryController", function ($scope, Story, socketio) {

    Story.allStory().then(function (data) {

        $scope.stories = data;
    });


    $scope.createStory = function () {

        $scope.message = "";

        Story.createStory($scope.storyData).then(function (data) {

            $scope.message = data.message;
        });

    };

    socketio.on("story", function (data) {
        $scope.stories.push(data);
    })
});

storyCtrl.controller("AllStoriesCtr", function ($scope, stories, socketio) {

    $scope.stories = stories.data;

    socket.io("story", function (data) {
        $scope.stories.push(data);
    })

});