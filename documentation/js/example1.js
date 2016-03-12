angular.module('app').controller('example1Controller', function controller($scope) {
    $scope.person = {};
    $scope.submitForm = function () {
        alert('form submitted');
    }
});