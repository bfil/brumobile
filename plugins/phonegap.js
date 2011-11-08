Brumobile.Plugin.define("phonegap",
	function () {
		var plugin = this;
		var config = plugin.config;
		
		function backKeyDown() {
			if($.tapReady()) {
				if(navigator.back) navigator.back();
				else {
					navigator.app.exitApp();
				}
			}
		}
		
		db = {};
		
		document.addEventListener("backbutton", backKeyDown, true);
		
		navigator.notification.loading = false
		navigator.notification.loadingStart = function(title, message) {
			if(!navigator.notification.loading) {
				$.tapReady(false);
				navigator.notification.activityStart(title, message);
			}
			navigator.notification.loading = true;
		}
		navigator.notification.loadingStop = function() {
			if(navigator.notification.loading) {
				$.tapReady(true);
				navigator.notification.activityStop();
			}
			navigator.notification.loading = false;
		}
		
		loadingStart = navigator.notification.loadingStart;
		loadingStop = navigator.notification.loadingStop;
		alert = function(title, message) {
			if(!message) {
				message = title;
				title = "Alert";
			}
			navigator.notification.alert(message, null, title);
		};
		
		device.os = device.platform || Brumobile.config.os;
		
		var proxiedExit = navigator.app.exitApp;
		navigator.app.exitApp = function() {
			 navigator.notification.confirm(
		        "Do you really want to close the application?",
		        function(button) {
		        	if(button == 1) proxiedExit();	
		        },
		        'Closing Application',
		        'Yes,No'
		    );
		}
		db.openDB = function() {
			return window.openDatabase(config.db.name || "BrumobileDB",
									   config.db.version || "1.0",
									   config.db.description || "Brumobile Database",
									   config.db.size || 1000000);
		}
		
		db.createTable = function(tableName, fields) {
			var fielsStr = fields.join(",");
			function createTable(tx) {
			    tx.executeSql("CREATE TABLE IF NOT EXISTS " + tableName + " (id unique, " + fielsStr + ")");
			}
			function error(err) {}
			function success() {}
			db.openDB().transaction(createTable, error, success);
		}
		navigator.app.ready = function() {
			prompt("", "gap_init:");
		}
		
		
		Brumobile.Model = (function() {
	
			function S4() {
			   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
			}
			function guid() {
			   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
			}
			
			var define = function(name, obj) {
				
				var tableName = name;
				
				var Model = function(props) {
					for(var i in props) {
						if(obj[i] || "id") {
							this[i] = props[i];
						}
					}
				};
				
				
				var fields = [];
				for(var i in obj) {
					fields.push(i);
				}
				db.createTable(tableName, fields)
				
				Model.create = function(obj) {
					return new Model(obj);
				}
				
				Model.find = function(options, callback, error) {
					function select(tx) {
						var where = "";
						var fields = [];
						for(var i in options) {
							if(obj[i] || i == "id") {
								if(obj[i] == "string" || i == "id")
									fields.push(i + " = '" + options[i] + "'");
								else if(obj[i] == "number")
									fields.push(i + " = " + options[i]);
							}
							if(fields.length > 1) {
								where = fields.join(" AND ");
							}
							else if(fields.length == 1) {
								where = fields[0];
							}
						}
						if(where != "") where = " WHERE " + where;
					    tx.executeSql('SELECT * FROM ' + tableName + where, [], success || function() {}, error || function() {});
					}
					function success(tx, results) {
					    if(results && results.rows) {
					    	if(callback) {
						    	var resultsArray = [];
						    	for(var i=0; i < results.rows.length; i++) {
									resultsArray.push(new Model(results.rows.item(i)));
								}
						    	callback(resultsArray);
					    	}
					    }
					    else {
					    	if(callback) callback([]);
					    }
					}
					
					db.openDB().transaction(select, error || function() {});
				}
				
				Model.findOne = function(options, callback, error) {
					Model.find(options, function(results) {
						if(results && results.length > 0) callback(results[0]);
						else callback(null);	
					}, error)
				}
				
				Model.destroyAll = function(success, error) {
					function destroyAll(tx) {
						tx.executeSql("DELETE FROM " + tableName);
					}
					
					db.openDB().transaction(destroyAll, error || function() {}, success || function() {});
				}
				
				Model.prototype.save = function(success, error) {
					var self = this;
					function save(tx) {
						if(self.id) {
							var values = "";
							var fields = [];
							for(var i in self) {
								if(obj[i]) {
									if(obj[i] == "string")
										fields.push(i + " = '" + self[i] + "'");
									else if(obj[i] == "number")
										fields.push(i + " = " + self[i]);
								}
								if(fields.length > 1) {
									values = fields.join(", ");
								}
								else if(fields.length == 1) {
									values = fields[0];
								}
							}
							if(values != "") {
								tx.executeSql("UPDATE " + tableName + " SET " + values + " WHERE id = '" + self.id + "'");
							}
						}
						else {
							self.id = guid();
							var fields = "";
							var values = "";
							var fieldsArray = ["id"];
							var valuesArray = ["'" + self.id +"'"];
							for(var i in self) {
								if(obj[i]) {
									fieldsArray.push(i);
									if(obj[i] == "string") {
										valuesArray.push("'" + self[i] + "'");
									}
									else if(obj[i] == "number") {
										valuesArray.push(self[i]);
									}
								}
								if(fieldsArray.length > 1) {
									fields = fieldsArray.join(",");
									values = valuesArray.join(",");
								}
								else if(fieldsArray.length == 1) {
									fields = fieldsArray[0];
									values = valuesArray[0];
								}
							}
							tx.executeSql("INSERT INTO " + tableName + " (" + fields + ") VALUES (" + values + ")");
						}
					}
					
					db.openDB().transaction(save, error || function() {}, success || function() {});
				}
				
				Model.prototype.destroy = function(success, error) {
					var self = this;
					function destroy(tx) {
						if(self.id)
							tx.executeSql("DELETE FROM " + tableName + " WHERE id = '" + self.id + "'");
					}
					
					db.openDB().transaction(destroy, error || function() {}, success || function() {});
				}
				
				return Model;
				
			}
			
			
			return {
				define: define
			};
			
		})();
		
		plugin.done();
		
	}
);