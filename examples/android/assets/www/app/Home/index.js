Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		done();
	}
	
	view.onShow = function() {
		
	};
	
	navigator.back = function() {
		navigator.app.exitApp();
	};
	
	$("#btnCompass").tap(function(e) {
		navigate({
			controller: "Compass"
		});
	});
	
	$("#btnPicture").tap(function(e) {
		navigate({
			controller: "Camera",
			action: "picture"
		});
	});
	
	$("#btnGeocoding").tap(function(e) {
		navigate({
			controller: "Geocode"
		});
	});
	
	$("#btnBluetooth").tap(function(e) {
		navigate({
			controller: "Bluetooth",
			action: "devices",
			params: { msg: "Click to scan for devices" }
		});
	});
	
});