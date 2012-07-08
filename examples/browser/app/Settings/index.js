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
	
	$("#btnSave").tap(function() {
		Settings.save("name", $("#name").val());
		alert("Name Saved!");
	});
	
});