angular.module('hhV2', ['ngRoute', 'ngMap']) //ngMap
.controller('mapBlood', function($scope, $http, NgMap){ //NgMap
    $scope.teste = "asuhdahudauh";
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
        url: "/api/user/bank"
    }).then(
        (success) => {
            $scope.markers = success.data.results;
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )

    NgMap.getMap().then(function(map) { 
        // console.log(map.getCenter());
        // console.log('markers', map.markers);
        // console.log('shapes', map.shapes);
      });

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