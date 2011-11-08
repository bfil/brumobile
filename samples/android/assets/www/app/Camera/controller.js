Brumobile.Controller.define("Camera",
	{
		picture: function(params, viewResult) {
	
			Picture.get(function(data) {
				var src = null;
			    if(data) {
			    	navigator.notification.loadingStart("Please Wait", "Loading picture from DB..");
			    	src = "data:image/jpeg;base64," + data;
				    viewResult("Camera/picture", { pic_src: src });
			    }
			    else viewResult("Camera/picture", { pic_src: src });
			});
			
		}
	}
);