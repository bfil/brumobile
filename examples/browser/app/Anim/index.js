Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		done();
	};
	
	view.onShow = function() {
		
	};
	
	navigator.back = function() {
		navigate_back({
			controller: "Home"
		});
	};
	
	$("#btnBack").tap(function() {
		navigator.back();
	});
	
	$("#btnSlide").tap(function() {
		navigate({
			controller: "Anim",
			anim: "slide"
		});
	});
	
	$("#btnSlideBack").tap(function() {
		navigate({
			controller: "Anim",
			anim: "slideback"
		});
	});
	
});