angular.module('MyApp', ['ngNewRouter', 'ngResource', 'ngTouch', 'ui.grid', 'home.service', 'MyApp.home'])
  .controller('AppController', ['$router', AppController]);

function AppController($router) {
	$router.config([
   		{path: '/', component: 'home' }
   	]);
}