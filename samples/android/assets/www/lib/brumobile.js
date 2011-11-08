var Brumobile = (function($) {
	
	//CONFIG
	
	var config = {
		appFolder: "app",
		pluginsFolder: "plugins",
		appContainerSelector: "#app",
		initialView: { controller: "Home" },
		anim: {
			enabled: true,
			defaultAnim: "slide",
			noAnim: "noanim"
		},
		plugins: []
	}
	
	// UTILS
	
	var canTap = true;
	$.tapReady = function (bool) {
    	if(bool != null)
    		canTap = bool;
    	else
    		return canTap;
	}
	
	$.getScript = function(url, success) {
		$.ajax({
			url: url,
			success: function(data) {
				if(data) {
					window[ "eval" ].call( window, data );
					success(data);
				}
				else alert("Error loading script: " + url);
			},
			error: function(xhr, status) {
				alert("Error: " + xhr.statusText);
			}
		});
	}
	
	// APPLICATION LOAD
	
	function load(options) {
		config = $.extend({}, config, options || {});
		Brumobile.config = config;
		loadPlugins();
	}
	
	function loadPlugins() {
		var pluginsLoaded = 0;
		if(config.plugins && config.plugins.length > 0) {
			for(var p in config.plugins) {
				var plugin = config.plugins[p];
				(function(pluginName) {
					
					function pluginLoaded() {
						pluginsLoaded++;
						if(pluginsLoaded == config.plugins.length) {
							loadInitialView();
						}	
					};
					
					if(Brumobile.plugins[pluginName]) {
						Brumobile.Plugin.load(pluginName, pluginLoaded);
					}
					else {
						$.getScript(config.pluginsFolder + "/" + pluginName + ".js",
							function(data) {
								Brumobile.Plugin.load(pluginName, pluginLoaded);
							}
						);
					}
				})(plugin);
			}
		}
		else loadInitialView();
	}
	
	function loadInitialView() {
		var options = config.initialView;
		var view = Router.route(options.controller, options.action, options.params, function(viewName, context) {
			Brumobile.Tmpl.get(viewName, function(html) {
				
				Brumobile.Tmpl.render(html, context, function(renderedHtml) {
					
			    	Brumobile.Navigator.insertPage(renderedHtml, function(page) {
					 	
					 	page.addClass("current");
			 			Brumobile.View.get(viewName, context, page, null, true)
			 						 			
			 		});
				});
			});
		});
	}
	
	// NAVIGATOR
	
	var Navigator = (function() {
		
		function navigate(options) {
			if(options && $.tapReady()) {
				var view = Brumobile.Router.route(options.controller, options.action, options.params, function(viewName, context) {
						
					Brumobile.Tmpl.get(viewName, function(html) {
						
						Brumobile.Tmpl.render(html, context, function(renderedHtml) {
					 		
					 		Brumobile.Navigator.insertPage(renderedHtml, function(page) {
					 			
					 			Brumobile.View.get(viewName, context, page, function() {
					 				
									Brumobile.Animator.animate(page, options.anim);
			                        if (options.callback) {
			                            options.callback(page);
			                        }
			                        
					 			});
					 			
					 		});
			        		
					 	});
			            
			        });
					
				});
			}
			
		};
		
		function insertPage(pageHtml, callback) {
			var targetPage = $(pageHtml);
			targetPage.appendTo($(config.appContainerSelector));
			callback(targetPage);
		}
		
		return {
			navigate: navigate,
			insertPage: insertPage
		}
		
	})();
	
	// ROUTER
	
	var Router = (function() {
		
		function route(controller, action, params, callback) {
			action = action || "index";
			var c = Brumobile.controllers[controller];
			if(!c) alert("Controller '" + controller + "' not found");
			else {
				var a = c[action];
				if(!a) alert("Action '" + controller + "/" + action + "' not found");
				else {
					a(params, callback);
				}
			}
		};
	    
	    return {
	    	route: route
	    };
	    
	})();
	
	// VIEWS
	
	var View = {
		get: function(viewName, context, page, callback, initial) {
			$.getScript(config.appFolder + "/" + viewName + ".js", function() {
				Brumobile.View.current.page = page;
				Brumobile.View.current.context = context;
				if(Brumobile.View.current.initialize) Brumobile.View.current.initialize(function() {
					if(Brumobile.View.current.onShow) {
						if(!initial) page.bind("pageAnimationEnd", Brumobile.View.current.onShow);
						else {
							Brumobile.View.current.onShow();
							if(config.postLoad) config.postLoad();
						}
					}
	                if (callback) {
	                    callback();
	                }
				});
			});
		},
		define: function(fn) {
			delete Brumobile.View.current;
    		delete Navigator.back;
			Brumobile.View.current = {};
			fn.call(Brumobile.View.current);
		}
	};
	
	// TEMPLATE ENGINE
	
	var Tmpl = {
		
		get: function(template, callback) {
			$.ajax({
	            url: config.appFolder + "/" + template + ".html",
	            type: "GET",
	            dataType: "html",
	            success: function (data, textStatus) {
	            	if(data) {
		            	callback(data);
	            	}
	            	else alert("Could not load template '" + config.appFolder +  "/" + template + ".html" + "'");
	            },
	            error: function (data) {
	                alert("Could not load template '" + config.appFolder +  "/" + template + ".html" + "'");
	            }
			});
		},
	
		render: function(template, context, callback) {
        	data = Mustache.to_html(template, context);
        	callback(data);
		}
		
	}
	
	// ANIMATOR 
	
	var Animator = {
		
		animate: function(toPage, animation) {
			
			animation = animation || Brumobile.config.anim.defaultAnim;
	    	
	        $(':focus').blur();
	        $('input').attr("disabled", true);
	        
	        var fromPage = $(Brumobile.config.appContainerSelector + " > div").first();
	        
	        toPage.trigger('pageAnimationStart');
	
	        if ($.support.animationEvents && Brumobile.config.anim.enabled && animation  && animation != Brumobile.config.anim.noAnim) {
	        	
	            $.tapReady(false);
	            
	            fromPage.unbind('webkitTransitionEnd');
	            toPage.bind('webkitTransitionEnd', navigationEndHandler);
	            
	            scrollTo(0, 0);
	            
	            toPage.addClass(animation + ' in current');
	            fromPage.addClass(animation + ' out');
	            setTimeout(function() {                	
	            	toPage.addClass('animate');
	            	fromPage.addClass('animate');
	            }, 5);
	
	        } else {
	            toPage.addClass('current');
	            navigationEndHandler();
	        }
	        
	        function navigationEndHandler(event) {
	        	
	            fromPage.remove();
	            
	            if ($.support.animationEvents && animation && Brumobile.config.anim.enabled) {
	                toPage.removeClass(animation + ' in animate');
	            }
	            
	            $.tapReady(true);
	            toPage.trigger('pageAnimationEnd');
	            $('input').removeAttr('disabled');
	            
	        }
	        return true;
	    }
	    
	};
	
	// MODEL
	
	var Model = (function(){
			
		var define = function(name, obj) {
			
			var id = 0;
			var objects = [];
			
			var Model = function(props) {
				for(var i in props) {
					if(obj[i] || "id") {
						this[i] = props[i];
					}
				}
			};
			
			Model.create = function(obj) {
				return new Model(obj);
			}
			
			Model.find = function(options, callback) {
				var findResults = objects.filter(function(obj) {
					var ok = true;
					for(var i in options) {
						var filter = options[i];
						if(obj[i] != options[i]) ok = false;
					}
					return ok;
				})
				callback(findResults);
			}
			
			Model.findOne = function(options, callback) {
				Model.find(options, function(results) {
					if(results && results.length > 0) callback(results[0]);
					else callback(null);	
				})
			}
			
			Model.destroyAll = function() {
				objects = [];
			}
			
			Model.prototype.save = function() {
				if(this.id) {
					objects[this.id] = this;
				}
				else {
					this.id = count++;
					objects.push(this);
				}
			}
			
			Model.prototype.destroy = function() {
				if(this.id) delete objects[this.id];
			}
			
			return Model;
		}
		
		return {
			define: define
		};
		
	})();
	
	// PLUGIN
	
	var Plugin = (function() {
		
		var define = function(name, fn) {
			Brumobile.plugins[name] = fn;
		}
		
		var load = function(pluginName, done) {
			var p = Brumobile.plugins[pluginName];
			var pluginConfig = null;
			if(config.pluginsConfig) pluginConfig = config.pluginsConfig[pluginName];
			
			var pluginContext = {};
			pluginContext.config = pluginConfig;
			pluginContext.done = done;
			
			p.call(pluginContext);
		}
		
		return {
			define: define,
			load: load
		}
		
	})();
	
	// CONTROLLER
	
	var Controller =  (function() {
		
		var define = function(name, obj) {
			Brumobile.controllers[name] = obj;
		}
		
		return {
			define: define
		}
		
	})();
	
	// BRUMOBILE OBJECT
	
	return {
		load: load,
		config: config,
		
		Navigator: Navigator,
		Router: Router,
		Tmpl: Tmpl,
		View: View,
		Model: Model,
		Animator: Animator,
		Plugin: Plugin,
		Controller: Controller,
		
		models: {},
		plugins: {},
		controllers: {},
	};
	
})(Zepto);