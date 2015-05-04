var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");
var Content = require("../views/Content.js");

var AppRouter = Backbone.Router.extend({
    routes: {
        '' : 'index',
        'about' : 'content',
        'typography' : 'content'
    },

    initialize: function() {
      console.log("Init route");
    },

    index: function(){
      console.log("INDEX");
        // var indexView
        // ViewManager.showView(indexView);
    },

    content: function(e) {
      Content.page = "about";
      Content.render();
        // ViewManager.showView(addNewView);
    }
});

var ViewManager = {
    currentView : null,
    showView : function(view) {
        if (this.currentView !== null && this.currentView.cid != view.cid) {
            this.currentView.remove();
        }
        this.currentView = view;
        return view.render();
    }
}

// Initiate the router
var app_router = new AppRouter;

// app_router.on('route:defaultRoute', function(actions) {
//     alert(actions);
// })

// // Start Backbone history a necessary step for bookmarkable URL's
// Backbone.history.start();


module.exports = App.Router;