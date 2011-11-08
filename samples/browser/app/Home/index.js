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
	
	$("#btnAnim").tap(function(e) {
		navigate({
			controller: "Anim"
		});
	});
	
	$("#btnSettings").tap(function(e) {
		navigate({
			controller: "Settings"
		});
	});
	
});