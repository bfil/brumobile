Brumobile.Plugin.define("shortcuts",
	function () {
		var plugin = this;
		var config = plugin.config || {};
		
		navigate = Brumobile.Navigator.navigate;
		navigate_back = function(options) {
			options.anim = "slideback";
			navigate(options);
		}
		
		plugin.done();
		
	}
);