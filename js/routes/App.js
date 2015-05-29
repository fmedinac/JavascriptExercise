var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");
var Content = require("../views/Content.js");
var Menu = require("../views/Menu.js");
var MenuCollection = require("../collections/Menu.js");
var $ = Backbone.$;
var currentRoute;

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

    _this.menuCollection = MenuCollection.getInstance();

    _this.menuCollection.deferred.done(function() {
        var collectionItems = _this.menuCollection.models[0].get("menu");
        
        searchForRoute(collectionItems, actions);


        $.when( Content.prepare(currentRoute), Menu.prepare(currentRoute) )
         .then( function(){
            Menu.setActive(actions);
    	 	Content.render();
    	 }, function(){} );
    });



});

function searchForRoute(array, search){
    for(var i = 0; i < array.length; ++i){
        // console.log(search, " - ", array[i], " | ", array[i].path === search);
        if (array[i].path === search) {
            currentRoute = array[i].route;

            return currentRoute;
        }else if(array[i].menu) {
            searchForRoute(array[i].menu, search);
        }
    }
    return false;
}

// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start();

module.exports = App.Router;