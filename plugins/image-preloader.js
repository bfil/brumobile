Brumobile.Plugin.define("image-preloader",
	function () {
		var plugin = this;
		var config = plugin.config;
		
		if (config.images) {
		    for (var i in config.images.length) {
		        (new Image()).src = config.images[i];
		    };
		}
		plugin.done();
	}
)