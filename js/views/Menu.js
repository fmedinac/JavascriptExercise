var Backbone = require("../libs/backbone.js");
var MenuCollection = require("../collections/Menu.js");
var $ = Backbone.$;
var _ = Backbone._;


var MenuView = Backbone.View.extend({
    el: "#menu ul",
    template: _.template($('#profileTemplate').html()),
    render: function(eventName) {
        var _this = this;
        
      // console.log(this.model);
      var item = this.collection.models[0].get("menu");
      var _this = this;
      this.collection.deferred.done(function() {
        _.each(item, function(profile){
            renderMenu(_this, _this.el, profile);

            if(profile.menu){
              var subUl = $(_this.el).find("li").eq($(_this.el).find("li").length-1).append($("<ul></ul>")).find("ul");
              _.each(profile.menu, function(subprofile){
                renderMenu(_this, subUl, subprofile);
              });
            }

        }, this);
      });

      return this;
    }
});
var renderMenu = function(_this, el, profile) {
  var profileTemplate = _this.template(profile);
  $(el).append(profileTemplate);
}

var menuCollection = new MenuCollection();
var profilesView = new MenuView({collection: menuCollection});
menuCollection.fetch({
    success: function() {
      profilesView.render();
    }
});
menuCollection.bind("reset", _.once(Backbone.History.start, Backbone.History))

module.exports = MenuView;