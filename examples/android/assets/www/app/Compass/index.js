Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		if(view.compassInterval) clearInterval(view.compassInterval);
		view.compassInterval = setInterval(function() {
			navigator.compass.getCurrentHeading(function(heading) {
				$('#angle').text(heading.magneticHeading).css("-webkit-transform","rotate("+(-heading.magneticHeading)+"deg)");
			}, function(e) { });
		},100);
		done();
	};
	
	view.onShow = function() {
		
	};
	
	navigator.back = function() {
		navigate_back({
			controller: "Home"
		});
	};
	
	view.compassInterval = null;
	
	$("#btnBack").tap(function() {
		navigator.back();
	});	
	
});