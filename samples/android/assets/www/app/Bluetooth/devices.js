Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		done();
	};
	
	view.onShow = function() {
		
	};
	
	navigator.back = function() {
		window.plugins.bluetooth.disableBT(null,
			function(r){
				navigate_back({
					controller: "Home"
				});
			},
			function(e){ alert(e); }
		);
	};
	
	view.listDevices = function() {
		$('#devices').text("Searching for BT devices..");
		navigator.notification.loadingStart("Please Wait", "Searching for BT devices..");
		window.plugins.bluetooth.isBTEnabled(null,
			function(enabled){
				if(!enabled) {
					window.plugins.bluetooth.enableBT(null,
						function(r){
							view.listDevices();
						},
						function(e){ alert(e); }
					);
				}
				else view.printBtDevices();
			},
			function(e) {
				navigator.notification.loadingStop();
				alert(e);
			}
		);
	},
	
	view.printBtDevices = function() {
		var self = this;
		window.plugins.bluetooth.listDevices(null,
			function(devices){
				navigator.notification.activityStop();
				devices = JSON.parse(devices);
				if(devices.length > 0) {
					$('#devices').text("");
					for(var i in devices) {
						var dev = devices[i];
						$('#devices').append("<li>" + dev.name + "</li>");
					}
				}
				else $('#devices').html("No device was found.<br />" + self.context.empty_message);
				navigator.notification.loadingStop();
			},
			function(e) {
				navigator.notification.loadingStop();
				alert(e);
			}
		);
	}
	
	$("#btnDevices").tap(function() {
		view.listDevices();
	});	
	
	$("#btnBack").tap(function() {
		navigator.back();
	});	
	
});