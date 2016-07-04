angular.module('tracker.controllers', ['tracker.services'])
     
.controller('trackerHomeCtrl', function($scope) {

})
   
.controller('listOfMembersCtrl', function($scope) {

})

.controller('trackingMapCtrl', function ($rootScope, $scope, API, $timeout, $ionicModal, $window) {
	//$rootScope.$on('getUserLocation', function(){)
	API.getLatestLocation($rootScope.getToken(),'rajkumar.shinde@gmail.com').success(function (data, status, headers, config) {})
	//var myLatLng={lon:27,lat:35};
	/*
    $rootScope.$on('getUserLocation', function(){
            API.getLatestLocation($rootScope.getToken(),'rajkumar.shinde@gmail.com').success(function (data, status, headers, config) {
            $rootScope.show("Please wait... Processing");
            
			myLatLng =  new google.maps.LatLng(data.lat,data.lon);
			$scope.list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].isCompleted == false) {
                    $scope.list.push(data[i]);
                }
            };
            if($scope.list.length == 0)
            {
                $scope.noData = true;
            }
            else
            {
                $scope.noData = false;
            }

            $ionicModal.fromTemplateUrl('templates/newItem.html', function (modal) {
                $scope.newTemplate = modal;
            });

            $scope.newTask = function () {
                $scope.newTemplate.show();
            };
            $rootScope.hide();
        }).error(function (data, status, headers, config) {
            $rootScope.hide();
            $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    });*/
/*
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
  });
		$scope.map = map;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	*/
    })
	
.controller('mapCtrl', function($scope) {

})
   
.controller('signupCtrl',function ($rootScope, $scope, API, $window) {
    $scope.user = {
        email: "",
        password: "",
        name: ""
    };

    $scope.createUser = function () {
    	var email = this.user.email;
        var password = this.user.password;
        var uName = this.user.name;
		//var mobileNo = this.user.mobile;
        if(!email || !password || !uName ) {
        	$rootScope.notify("Please enter valid data");
        	return false;
        }
        $rootScope.show('Please wait.. Registering');
        API.signup({
            email: email,
            password: password,
            name: uName
			//mobile: mobileNo
        }).success(function (data) {
            $rootScope.setToken(email); // create a session kind of thing on the client side
            $rootScope.hide();
            $window.location.href = ('#/homePage');
        }).error(function (error) {
            $rootScope.hide();
        	if(error.error && error.error.code == 11000)
        	{
        		$rootScope.notify("A user with this email already exists");
        	}
        	else
        	{
        		$rootScope.notify("Oops something went wrong, Please try again!");
        	}
            
        });
    }
})
   
.controller('loginCtrl', function ($rootScope, $scope, API, $window) {
    // if the user is already logged in, take him to his bucketlist
    if ($rootScope.isSessionActive()) {
        $window.location.href = ('#/homePage');
    }
 
    $scope.user = {
        email: "",
        password: ""
    };
 
    $scope.validateUser = function () {
        var email = this.user.email;
        var password = this.user.password;
        if(!email || !password) {
        	$rootScope.notify("Please enter valid credentials");
        	return false;
        }
        $rootScope.show('Please wait.. Authenticating');
        API.signin({
            email: email,
            password: password
        }).success(function (data) {
            $rootScope.setToken(email); // create a session kind of thing on the client side
            $rootScope.hide();
            $window.location.href = ('#/homePage');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }
 
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