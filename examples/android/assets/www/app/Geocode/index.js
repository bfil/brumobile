Brumobile.View.define(function() {
	
	var view = this;
	
	view.initialize = function(done) {
		done();
	};
	
	view.onShow = function() {
		view.callGeolocation();
	};
	
	navigator.back = function() {
		navigate_back({
			controller: "Home"
		});
	};
	
	view.callGeolocation = function() {
		$('#lat').text("...");
		$('#lng').text("...");
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Corso+Vittorio+Emanuele,Torino,Italy&sensor=false',
			dataType: 'json',
			success: function( data ) {
			 	if(data.results) {
			    	var loc = data.results[0].geometry.location;
			    	$('#lat').text(loc.lat);
			    	$('#lng').text(loc.lng);
			    }
			    else {
			    	alert("No Data Received");
			    }
		   	},
		   	error: function(xhr, status, error) {
		   	   	alert("Geocoding Failed!");
		   	}
		});
	}
	
	$("#btnGeo").tap(function() {
		view.callGeolocation();
	});
	
	$("#btnBack").tap(function() {
		navigator.back();
	});	
	
});