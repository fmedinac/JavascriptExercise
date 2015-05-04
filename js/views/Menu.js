var Backbone = require("../libs/backbone.js");
var $ = Backbone.$;
var _ = Backbone._;

var ProfileList = require("../collections/Menu.js");

var ProfileView = Backbone.View.extend({
    el: "#menu ul",
    template: _.template($('#profileTemplate').html()),
    render: function(eventName) {
      // console.log(this.model);
      var item = this.model.models[0].get("menu");
      var _this = this;
        _.each(item, function(profile){
            renderMenu(_this, _this.el, profile);

            if(profile.menu){
              var subUl = $(_this.el).find("li").eq($(_this.el).find("li").length-1).append($("<ul></ul>")).find("ul");
              _.each(profile.menu, function(subprofile){
                renderMenu(_this, subUl, subprofile);
              });
            }

        }, this);

        return this;
    }
});
var renderMenu = function(_this, el, profile) {
  var profileTemplate = _this.template(profile);
  $(el).append(profileTemplate);
}

var profiles = new ProfileList();    
var profilesView = new ProfileView({model: profiles});
profiles.fetch({
    success: function() {
      profilesView.render();
    }
});
profiles.bind("reset", _.once(Backbone.History.start, Backbone.History))

module.exports = ProfileView;