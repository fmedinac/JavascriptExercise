var Backbone = require("../libs/backbone.js");
var Activity = require("../collections/Activity");
var Discover = require("../collections/Discover");
var $ = Backbone.$;
var _ = Backbone._;
var collection, menuCollection, currentItem;


var ContentView = Backbone.View.extend({
    el: "#page",
    template: _.template($('#pageTemplate').html()),
    init: function(eventName) {
      console.log("init view content");
        return this;
    },
    prepare: function(actions){
      var _this = this,
          deferred = $.Deferred();

      switch(actions){
        case 'activity':
          _this.collection = new Activity();
          break;
        case 'discover':
        default:
          _this.collection = new Discover();
          break;
      }

      _this.collection.deferred.done(function() {
          var data = _this.collection.toJSON();
          _this.title = data[0].index.title;
          deferred.resolve();
      });

      return deferred.promise();
    },
    render: function(e) {
      // console.log(e);
      this.$el.html(this.template({title: this.title}));

      //   // Compile the template using underscore
      //   var template = _.template( $("#search_template").html(), {} );
      //   // Load the compiled HTML into the Backbone "el"
      //   $(this.el).html( this.page );
    }
});

var contentView = new ContentView();

module.exports = contentView;