var Picture = Brumobile.Model.define(
	"PICTURES",
	{
		data: "string"
	}
);

Picture.get = function(callback) {
	Picture.findOne(null, function(pic) {
		if(pic) callback(pic.data);
		else callback(null);
	});
}

Picture.save = function(data) {
	Picture.findOne(null, function(pic) {
		if(pic) {
			pic.data = data;
			pic.save();
		}
		else {
			var pic = new Picture({data:data});
			pic.save();
		}
	});
}