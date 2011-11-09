Brumobile.Controller.define("Settings",
	{
		index: function(params, viewResult) {
			
			Settings.get("name", function(val) {
				if(val) {
					viewResult("Settings/index", { name: val });
				}	
				else viewResult("Settings/index");
			})
			
			
		}	
	}
);