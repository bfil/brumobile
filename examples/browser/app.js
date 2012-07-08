Brumobile.load({
	initialView: {
		controller: "Home"
	},
	plugins: [
		"shortcuts",
		"image-preloader",
		"controllers-loader",
		"models-loader"
	],
	pluginsConfig: {
		"image-preloader" : {
			images: []
		},
		"controllers-loader" : {
			controllers: [
				"Home",
				"Anim",
				"Settings"
			]
		},
		"models-loader" : {
			modelsFolder: "models",
			models: [
				"settings"
			]
		}
	}
})