describe('MyApp', function () {
  beforeEach(module('MyApp'));

  describe('HomeController', function () {
    var $scope;
    var $ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      $ctrl = $controller('HomeController', {$scope: $scope});
    }));

    it('should create "zipcode" of 42066', function () {
      expect($scope).toBeDefined();
      expect($ctrl).toBeDefined();

      expect($ctrl.zipCode).toBe('42066');
      expect($ctrl.zipCodeChanged).toBeDefined();
      expect($ctrl.gridOptions).toBeDefined();
    });
  });
});