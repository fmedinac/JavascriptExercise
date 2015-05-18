var Backbone = require("../libs/backbone.js");
var MenuCollection = require("../collections/Menu.js");
var $ = Backbone.$;
var _ = Backbone._;
var menuData;
var collection;


var MenuView = Backbone.View.extend({
    el: "#menu ul",
    template: _.template($('#profileTemplate').html()),
    prepare: function(actions){
      
      var _this = this,
          deferred = $.Deferred();

      if($(_this.el).html().length) {
        deferred.resolve();
      }else{
        _this.collection = new MenuCollection();

        _this.collection.deferred.done(function() {
          var item = _this.collection.models[0].get("menu");
          _.each(item, function(profile){
              renderMenu(_this, _this.el, profile);

              if(profile.menu){
                var subUl = $(_this.el).find("li").eq($(_this.el).find("li").length-1).append($("<ul></ul>")).find("ul");
                _.each(profile.menu, function(subprofile){
                  renderMenu(_this, subUl, subprofile);
                });
              }
              deferred.resolve();
          }, _this);
        });
      }

      return deferred.promise();
    },
    render: function(eventName) {
      return this;
    }
});
var renderMenu = function(_this, el, profile) {
  var profileTemplate = _this.template(profile);
  $(el).append(profileTemplate);
}

var menuView = new MenuView();

module.exports = menuView;