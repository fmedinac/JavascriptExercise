var Backbone = require("../libs/backbone.js");
var $ = Backbone.$;
var _ = Backbone._;

var ProfileList = require("../collections/Menu.js");

var ContentView = Backbone.View.extend({
    el: "#page h1",
    template: _.template($('#pageTemplate').html()),
    init: function(eventName) {
      console.log("init view content");
        return this;
    },
    render: function(e) {
      console.log(this.title);
      this.$el.html(this.template({title: this.title, status: "Carregado"}));
      //   // Compile the template using underscore
      //   var template = _.template( $("#search_template").html(), {} );
      //   // Load the compiled HTML into the Backbone "el"
      //   $(this.el).html( this.page );
    }
});

function findNodeByRoute(route, node) {
    var i,
        currentChild,
        result;

    for(var e = 0; e < node.length; ++e){
      var currentNode = node[e];

      if (route == currentNode.route) {
          return currentNode;
      } else {

          // Use a for loop instead of forEach to avoroute nested functions
          // Otherwise "return" will not work properly
          for (i = 0; i < currentNode.menu.length; i += 1) {
              currentChild = currentNode.menu[i];

              // Search in the current child
              result = findNodeByRoute(route, currentChild);

              // Return the result if the node has been found
              if (result !== false) {
                  return result;
              }
          }

          // The node has not been found and we have no more options
          return false;
      }
    }
}

var profiles = new ProfileList();    
var Content = new ContentView({model: profiles});
profiles.fetch({
    success: function() {
      Content.render();
    }
});

module.exports = Content;