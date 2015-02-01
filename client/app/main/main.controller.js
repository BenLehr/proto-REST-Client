'use strict';

angular.module('restClientApp')
.controller('MainCtrl', function ($scope, $http, socket) {   
  $scope.users = [];

  $http.get('http://localhost:8080/data/users').success(function(users) {
    $scope.users = users;
    socket.syncUpdates('user', $scope.users);
  });


  $scope.addUser = function() {
    if($scope.newUser.username === '') {
      return;
    }


    //  $http.post('http://localhost:8080/data/user/add'+ { $scope.newUser});
    $http.post('http://localhost:8080/data/user/add?username='+$scope.newUser.username+'&lastname='+$scope.newUser.lastname+"&password="+$scope.newUser.password)
    .success(function(data, status, headers, config) {
    
    console.log(data);
   
    $scope.newUser = '';
    $scope.users.push(data);
    });
    
   };


   $scope.deleteUser = function(user) {
    $http.delete('http://localhost:8080/data/user/delete?username=' + user.username);
    var index = $scope.users.indexOf(user)
   $scope.users.splice(index, 1);   
  };

  $scope.$on('$destroy', function (user) {
    socket.unsyncUpdates('user');
  });
});
