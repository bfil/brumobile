Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		Settings.get("name", function(val) {
			if(val) {
				$("#name").val(val);
				done();
			}	
			else done();
		})
		
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