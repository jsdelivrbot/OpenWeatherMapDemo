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
  }])
  .factory('LocateRuns', [function() {
    var locateRunsFactory = function() {
        function LocateRuns() { }

        LocateRuns.getRunsResult = function(inputStr, inputInt) {
          var result = '';
          var previousChar = '';
          var currentCharCount = 0;

          for (var i = 0; i < inputStr.length; i++) {
            var currentChar = inputStr[i];

            if (currentChar === previousChar) {
              currentCharCount++;
            } else {
              currentCharCount = 0;
              previousChar = currentChar;
            }

            if (currentCharCount < inputInt) {
              result += currentChar;
            }
          };

          return result;
        };

        return LocateRuns;
    };

    return locateRunsFactory;
  }]);

angular.module('MyApp.home', ['ui.grid', 'home.service'])
  .controller('HomeController', ['WeatherData', 'LocateRuns', function (WeatherData, LocateRuns) {
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

    that.getRunsResult = function() {
      var runsResult = LocateRuns().getRunsResult(that.inputStr, that.inputInt);

      return runsResult;
    };

	  this.gridOptions = {
      enableSorting: true,
      columnDefs: [
        { name:'name', field: 'name' },
        { name:'value', field: 'value' }
      ]};

    that.zipCodeChanged();
  }]);