
angular.module("stepsCounterAppModule")
	.component("notFound", {
		templateUrl: "app/appModule/notfound.component.html",
		controller: function(){
			//doesn't need any functionality in the notfound.component.html page.
			//it just loads up an h3 banner.
			//so don't need to give any properties or funcitonality to the controller
		},
		controllerAs:"vm"
			//don't need this either for that reason. Just getting in the habit
			//we won't be referring to it in the notfound.comp.html so we won't need the
			//easier to remember name
		
	})