angular.module('app').controller('example2Controller', function controller($scope, $http, $sce) {
	$scope.form = {

	};
	$scope.people = [
		{ name: 'Adam',      email: 'adam@email.com',      age: 10 },
		{ name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
		{ name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
		{ name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
		{ name: 'Estefania', email: 'estefania@email.com', age: 16 },
		{ name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
		{ name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
		{ name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
	];

});