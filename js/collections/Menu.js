var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");

var MenuCollection = {
	instance: false,
	getInstance: function(options) {
		var _this = this;
		
		if(!_this.instance) {
			var Collection = Backbone.Collection.extend({
			    model: App,
			    url: 'api/menu/data.json',
			    
			    initialize: function() {
			    	console.log("Init Collection Menu");
			        // Assign the Deferred issued by fetch() as a property
			        this.deferred = this.fetch();
			    }
			});
			_this.instance = new Collection({});
			return _this.instance;
		}else{
			return _this.instance;
		}
	}

}

module.exports = MenuCollection;