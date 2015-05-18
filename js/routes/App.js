var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");
var Content = require("../views/Content.js");
var Menu = require("../views/Menu.js");
var $ = Backbone.$;


var AppRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute" // matches http://example.com/#anything-here
    }
});
// Initiate the router
var app_router = new AppRouter;

app_router.on('route:contentRoute', function(actions) {
    console.log(actions);
});

app_router.on('route:defaultRoute', function(actions) {
    var _this = this;

    $.when( Content.prepare(actions), Menu.prepare(actions) )
	 .then( function(){
	 	Content.render();
	 }, function(){} );

});

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

module.exports = App.Router;