angular.module("stepsCounterAppModule")
	.component("stepsComponent", {
		templateUrl:"app/appModule/stepscounter.component.html",
		controller: function(stepsService){
		
		//CRUD functionality that interacts with the views/user
			var vm = this;
			
			vm.selected = null; //this helps us show a single step day by itself
			vm.editStepDay = null;
			vm.totalSteps = 0; //can display this property on the page
			
			vm.stepDayList = [ ]; //this is our local list of step days we can show the user
			
			
			function reload(){ //easier to call reload in our other functions
									//to populate our local list if we have this
				stepsService.index()
					.then(function(response){
						vm.stepDayList = response.data; //had this as a local at first.
						countTotalSteps(); // after the stepDayList has been populated... count em up, and set the global var
					})				
			}
			
			
			
			reload(); //we call this immediately to ensure our data for the page loads
			
			
			
			
			
			//need to hook up the edit button in the html to show this if they click edit
			vm.showStepDay = function(stepDay){
				vm.selected = stepDay;
				return vm.selected;
			}
			
			vm.addStepDay = function(stepDay){
				var copy = angular.copy(stepDay);
				
				stepsService.create(copy)
					.then(function(response){
						reload(); //after we add the new object and get it to the db, reload our local list
					})
					
			}
			
			vm.destroyStepDay= function(stepDay){
				stepsService.destroy(stepDay)
					.then(function(response){
						reload();
				})		
			}
			
			vm.updateStepDay = function(stepDay){ //okay this only has a stepDay... only 1 user
				stepDay.id = vm.editStepDay.id;
				stepsService.update(stepDay)
					.then(function(response){
						reload();
						vm.editStepDay = null;
						vm.selected = null;
					})
			}
			
			vm.setEditStepDay = function(){
				vm.editStepDay = angular.copy(vm.selected);
				//we do this so we only create a shallow copy for the time being...
				//BUT if the person decides to "save" then we will actually replace the current
				//copy in the list
			}
			
			vm.cancelEditStepDay = function(){
				vm.editStepDay = null; //erases the editStepDay value and we can repopulate
				//the table... so we could do an ng-show on the table if this field is null
			}
			
			vm.displayStepDayLog = function(){
				vm.selected = null; 
				//so if we were on the edit page and somebody clicked "cancel",
				//it would allow the table to be shown without making changes
			}
			
			function countTotalSteps(){
				vm.totalSteps = 0; //reset them back to 0 each time you recount
				
				vm.stepDayList.forEach(function(element){ //no inner loop cuz steps aren't an object.. can reach in and grab directly
					vm.totalSteps += element.steps; 
				}) //forEach
			}
		},
		controllerAs:"vm"
			
	})