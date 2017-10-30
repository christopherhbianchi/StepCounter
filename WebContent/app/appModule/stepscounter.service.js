angular.module("stepsCounterAppModule")
	.factory("stepsService", function($http, $filter){
		
	//CRUD functionality that interacts with the database. Like DAOImpl
	
			var service = {};
			var baseUrl = "rest/stepDays";
			
			var stepsCounterList = [ ] //list of objects
		
			service.index = function(){
				return $http({
					method:"GET",
					url: `rest/stepDays`, //this didn't work either, but in postman it works
				}) //this is returning a promise
			}
			
			service.show = function(stepDay){
				var id = stepDay.id;
				return $http({
					method:"GET",
					url:baseUrl + "/" + id //need to pass an id in
				})
				
			}
			
			service.create = function(stepDay){
				var date = $filter('date')(Date.now(), 'MM/dd/yyyy');
			    stepDay.dateStepped = date;
//			    copy.steps = $(inputSteps.stepsForDay).val(); //dont' need this, it's passed in with the "stepDay" object
				
				return $http({ //need to make a copy of the stepDay at some point here, or in the component
					method:"POST",
					url:baseUrl,
					headers:{
						"Content-type":"application/json"
					},
				data:stepDay
				})
				
			}
			
			service.destroy = function(stepDay){ //okay to only pass a single stepDay, and no user data... there's only one user
				console.log(stepDay.id);
				var id = stepDay.id;
				return $http({
					method:"DELETE",
					url:baseUrl + "/" + id,
					headers:{
						"Content-type":"application/json"
					},
					data:stepDay
				})
				
			}
			
			service.update = function(stepDay){ //having only one user helps this, otherwise we'd need a user id or something
				var id = stepDay.id;
				return $http({
					method:"PUT",
					url:baseUrl + "/" + id, //the id is undefined here. need to make sure form passes that in
					headers:{
						"Content-type":"application/json"
					},
					data:stepDay
				})
				
			}
			
			return service; //we always return a service
			
	})