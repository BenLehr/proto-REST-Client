'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('restClientApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:8080/data/users')
      .respond(['[{"id":"54cd5dfaf1cea6189ad9bd1f","username":"Ben","lastname":"Lehr","password":"88fe3e9f6296ef379ee306fe39f5315122cf82f493f821368766a353624e2905"}]']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });
});
