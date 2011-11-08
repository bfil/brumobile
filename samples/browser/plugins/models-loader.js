Brumobile.Plugin.define("models-loader",
	function () {
		var plugin = this;
		var config = plugin.config;
		
		var modelsLoaded = 0;
		if(config.models && config.models.length > 0) {
			for(var m in config.models) {
				var model = config.models[m];
				$.getScript(config.modelsFolder + "/" + model + ".js",
					function(data) {
						modelsLoaded++;
						if(modelsLoaded == config.models.length) {
							plugin.done();
						}
					}
				);
			}
		}
		else plugin.done();
	}
);