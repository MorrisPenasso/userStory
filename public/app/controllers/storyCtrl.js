var storyCtrl = angular.module("storyCtrl", ["storyService"]);

storyCtrl.controller("StoryController", function($scope, Story)  {

    Story.allStory().then(function(data)    {
    
        $scope.stories = data;
    });


    $scope.createStory = function() {
    
        $scope.message = "";

        Story.createStory($scope.storyData).then(function (data) {

            $scope.storyData = "";

            $scope.message = data.message;

            $scope.stories.push(data);

        });

    };

});