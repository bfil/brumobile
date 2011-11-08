Brumobile.Plugin.define("controllers-loader",
	function () {
		var plugin = this;
		var config = plugin.config;
		
		var controllersLoaded = 0;
		if(config.controllers && config.controllers.length > 0) {
			for(var c in config.controllers) {
				var controller = config.controllers[c];
				$.getScript(Brumobile.config.appFolder + "/" + controller + "/controller.js",
					function(data) {
						controllersLoaded++;
						if(controllersLoaded == config.controllers.length) {
							plugin.done();
						}
					}
				);
			}
		}
		else plugin.done();
	}
);