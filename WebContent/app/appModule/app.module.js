angular.module("stepsCounterAppModule", ['ngRoute'])
	.config(function($routeProvider){
		
		$routeProvider.when('/',{
			template:"<steps-component></steps-component>" //the name of the component as an element in snake case
		})
		.otherwise({
			template:"<not-found></not-found>" //need to make component and html for not found to route them to
		})
		
	})
	
	//the component is where we would find the services that would allow us to change the user's url 
	//on their screen if they clicked something... 
	//below is an example from the component of the todoList in another project.
	//we can call upon $location and $routeParams in the component after injecting them to manipulate
	//stuff for the user.
	//in the example below we say "if we try to update a task with a certain id, and the user attached to it's id doesn't match yours...
	//then send them to the not found page.
	//for this app in particular tho we don't use this tool or the routeParams tool cuz there's only one user.
	//we don't need to pull or get any extra information to do that extra verification since we only have 1 user.

	
	//the service injection into the component's controller function:
//  angular.module("todoListAppModule")
//	.component("helloTodo",{
//		
//		templateUrl:"app/appModule/todoList.component.html",
//		controller:function(todoService, $filter, $routeParams, $location){
//			var vm = this;
//			
//
//	
	
	//the body of that component
//function reload(){
//				todoService.index() //id is hardcoded in service index method for now
//					.then(function(response){
//						vm.todos = response.data;
//						vm.getNumTodos();
//						
//						console.log(parseInt($routeParams.id))
//						
//						if(parseInt($routeParams.id)){ //this is is the wild card ":id" in the app module config
//							
//							var specificId = $routeParams.id; //not parsing here...
//							vm.todos.forEach(function(element){
//
//								if(element.id == specificId){ //since not parsing its == so the interpreter converts for us
//									console.log("in the inner if");
//
//									vm.selected = element;
//								}
//								
//							}); //forEach
//							
//							console.log(vm.selected);
//							
//							if(!vm.selected){
//							$location.path("notfound"); //junk will throw them into the "otherwise" in the config
//							}
//							
//						}//outer if
//						
//					});
//			}