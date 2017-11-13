angular.module('hhV2', ['ngRoute', 'ngMap']) //ngMap
.controller('mapBlood', function($scope, $http, NgMap){ //NgMap
    var map;
    NgMap.getMap().then(function(map) { 
        map = map;
    });
    // $scope.markers = [
    //     {
    //         "clinicas": "-30.0442021,-51.2077004"
    //     },
    //     {
    //         "pucrs": "-30.0566752,-51.1751618"
    //     },
    //     {"hemocentro-bento": "-30.046577,-51.2175465"},
    //     {"santa casa": "-30.046577,-51.2175465"}
    // ]

    $http({
        method: "GET",
        url: "https://hemoheroes.com/api/user/bank"
    }).then(
        (success) => {
            $scope.markers = success.data.results;
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )

    $scope.showSites = function (evt, id) {
        $scope.selectedSite = $scope.markers[id];
        $scope.showInfoWindow.apply(this, [evt, 'bar-info-window']);
    };

})
.config(function($routeProvider)
    {
        $routeProvider
        .when("/", {
            templateUrl : "templates/map.html",
            controller  : 'mapBlood'
        })
        .otherwise({
            redirectTo: '/'
        })
    }
);