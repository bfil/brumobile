Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		if(navigator.notification.loading) {
			setTimeout(function() {
				navigator.notification.loadingStop();
				done();
			},500);
		}
		else done();
	};
	
	view.onShow = function() {
		
	};
	
	navigator.back = function() {
		navigate_back({
			controller: "Home"
		});
	};
	
	view.capturePhoto = function() {
	    navigator.camera.getPicture(function success(imageData) {
	    	$("#pic").attr("src","data:image/jpeg;base64," + imageData);
	    	Picture.save(imageData, null, function(e) {
	    		alert("Unable to save the image to DB");
	    	});
	    }, function fail() {
	    	
	    }, { quality: 50 });
	}
	
	$("#btnPic").tap(function() {
		view.capturePhoto();
	});
	
	$("#btnBack").tap(function() {
		navigator.back();
	});	
	
});