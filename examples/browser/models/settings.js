var Settings = Brumobile.Model.define(
	"SETTINGS",
	{
		name: "string",
		value: "string"
	}
);

Settings.get = function(name, callback) {
	Settings.findOne({name:name}, function(setting) {
		if(setting) callback(setting.value);
		else callback(null);
	});
}

Settings.save = function(name, value) {
	Settings.findOne({name:name}, function(setting) {
		if(setting) {
			setting.value = value;
			setting.save();
		}
		else {
			var setting = new Settings({name:name, value:value});
			setting.save();
		}
	});
}

Settings.remove = function(name) {
	Settings.findOne({name:name}, function(setting) {
		if(setting) {
			setting.destroy();
		}
	});
}