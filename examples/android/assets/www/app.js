document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	Brumobile.load({
		initialView: {
			controller: "Home"
		},
		plugins: [
			"shortcuts",
			"image-preloader",
			"controllers-loader",
			"phonegap",
			"models-loader"
		],
		pluginsConfig: {
			"image-preloader" : {
				images: []
			},
			"controllers-loader" : {
				controllers: [
					"Home",
					"Bluetooth",
					"Camera",
					"Compass",
					"Geocode"
				]
			},
			"phonegap" : {
				db: {
					name: "Brumobile",
					version: "1.0",
					description: "Brumobile DB",
					size: 500000
				}
			},
			"models-loader" : {
				modelsFolder: "models",
				models: [
					"picture"
				]
			}
		},
		postLoad: function() {
			setTimeout(function() {
				navigator.app.ready();
			}, 100);
		}
	});
}