var Backbone = require("../libs/backbone.js");
var Activity = require("../collections/Activity");
var Discover = require("../collections/Discover");
var $ = Backbone.$;
var _ = Backbone._;


var ContentView = Backbone.View.extend({
    el: "#page h1",
    template: _.template($('#pageTemplate').html()),
    init: function(eventName) {
      console.log("init view content");
        return this;
    },
    render: function(e) {
      console.log(this.title);

      console.log(this.activity); //.models[0].get("index"));


      // this.menu.deferred.done(function() {
        // this.$el.html(this.template({title: this.title, status: "Carregado"}));
      // });

      //   // Compile the template using underscore
      //   var template = _.template( $("#search_template").html(), {} );
      //   // Load the compiled HTML into the Backbone "el"
      //   $(this.el).html( this.page );
    }
});

var activityCollection = new Activity();
var discoverCollection = new Discover();
var Content = new ContentView({activity: activityCollection, discover: discoverCollection});


activityCollection.fetch({
    success: function() {
      profilesView.render();
    }
});
menuCollection.bind("reset", _.once(Backbone.History.start, Backbone.History))

module.exports = Content;