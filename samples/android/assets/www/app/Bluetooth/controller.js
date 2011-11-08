Brumobile.Controller.define("Bluetooth",
	{
		devices: function(params, viewResult) {
			var context = {
				empty_message : params.msg
			}
			viewResult("Bluetooth/devices", context);
		}
	}
);