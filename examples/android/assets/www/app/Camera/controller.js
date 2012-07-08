Brumobile.Controller.define("Camera",
	{
		picture: function(params, viewResult) {
	
			Picture.get(function(data) {
			    if(data) {
			    	navigator.notification.loadingStart("Please Wait", "Loading picture from DB..");
			    	var src = "data:image/jpeg;base64," + data;
				    viewResult("Camera/picture", { pic_src: src });
			    }
			    else viewResult("Camera/picture");
			});
			
		}
	}
);