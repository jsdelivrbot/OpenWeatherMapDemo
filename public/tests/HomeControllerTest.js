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

    it('should return aab for aaab,2', function() {
      expect($scope).toBeDefined();
      expect($ctrl).toBeDefined();

      $ctrl.inputStr = "aaab";
      $ctrl.inputInt = 2;

      expect($ctrl.getRunsResult).toBeDefined();
      expect($ctrl.getRunsResult()).toBe('aab');
    });

    it('should return abc for aaabbbccc,1', function() {
      expect($scope).toBeDefined();
      expect($ctrl).toBeDefined();

      $ctrl.inputStr = "aaabbbccc";
      $ctrl.inputInt = 1;

      expect($ctrl.getRunsResult).toBeDefined();
      expect($ctrl.getRunsResult()).toBe('abc');
    });

    it('should return aabbcc for aaabbbccc,2', function() {
      expect($scope).toBeDefined();
      expect($ctrl).toBeDefined();

      $ctrl.inputStr = "aaabbbccc";
      $ctrl.inputInt = 2;

      expect($ctrl.getRunsResult).toBeDefined();
      expect($ctrl.getRunsResult()).toBe('aabbcc');
    });

    it('should return aaabbbccc for aaabbbccc,3', function() {
      expect($scope).toBeDefined();
      expect($ctrl).toBeDefined();

      $ctrl.inputStr = "aaabbbccc";
      $ctrl.inputInt = 3;

      expect($ctrl.getRunsResult).toBeDefined();
      expect($ctrl.getRunsResult()).toBe('aaabbbccc');
    });
  });
});