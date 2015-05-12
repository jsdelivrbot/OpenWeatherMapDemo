// I used a custom service here because I could see some value in converting the object
// to an array later via the service. I also wanted to be able to provide the id to the
// service
// REF: http://stackoverflow.com/questions/12719782/angularjs-customizing-resource
angular.module('home.service', [])
  .factory('WeatherData', ['$http', function($http) {
  	var weatherDataFactory = function() {
        function WeatherData() { }

        WeatherData.$get = function(id) {
            return $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + id);
        };

        return WeatherData;
    }

    return weatherDataFactory;
  }]);

angular.module('MyApp.home', ['ui.grid', 'home.service'])
  .controller('HomeController', ['WeatherData', function (WeatherData) {
  	var that = this;

  	that.zipCode = '42066';	// default to my home :)

  	that.zipCodeChanged = function() {
  		var weatherServiceResult = WeatherData().$get(that.zipCode + ',us')
  		.success(function(wsResult) {
  			that.fullWeatherDisplay = wsResult;
  			
  		    that.myData =[
  				{ "name": "Longitude", "value": wsResult.coord.lon },
  				{ "name": "Latitude", "value": wsResult.coord.lat },
  				{ "name": "Temperature", "value": wsResult.main.temp },
  				{ "name": "Humidity", "value": wsResult.main.humidity }
  			];
  		});
  	};

	  this.gridOptions = {
      enableSorting: true,
      columnDefs: [
        { name:'name', field: 'name' },
        { name:'value', field: 'value' }
      ]};

    that.zipCodeChanged();
  }]);

// TODO:
// 1. Use the correct API from their test document
// 2. Write a unit test for this component, mostly the grid

// TODO: Complete this take home problem and send to Jim and company.
// function(str, i) {
//   // aaab, 2

//   var breakEm = str.ToArray();
//   var located = [];
//   var locatedMultiple = [];

//   breakEm.ForEach(function(be) {
//     if (!located.contains(be)) {
//       located.add(be);
//     } else if (located.contains(be)) {
//       var timesLocated = locatedMultiple.Where(x => x == be).Count();
//       // 4
//       if (timesLocated < i) {
//         locatedMultiple.add(be);
//       } // skip out otherwise
//     }
//   });

//   // house cleaning...
//   located.forEach(function(l) {
//     var exist = locatedMultiple.SingleOrDefault(l);

//     if (exist) {
//       located.Remove(l);
//     }
//   });

//   var result = locatedMultiple + located;

//   return result;
// }
