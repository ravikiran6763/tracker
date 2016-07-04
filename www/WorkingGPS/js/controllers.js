angular.module('app.controllers', ['ionic'])
     
.controller('trackerHomeCtrl', function($scope) {

})
   
.controller('listOfMembersCtrl', function($scope) {

})
  
.controller('trackingMapCtrl', function($scope, $http) {
	
var myLatLng;

	$http.get('http://localhost:8080/api/users')
        .success(function(data) {
            console.log(data);
			myLatLng = data;

			 var map  = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 8
        });
		
		var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
		$scope.map = map;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	
    })
	
.controller('myLocationMapCtrl', function($scope) {
	
	var map  = new google.maps.Map(document.getElementById('map'), {
         // center: myLatLng,
          zoom: 8
        });
	
	navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
	 
		
	
		$scope.map = map;
	
    });
 
  