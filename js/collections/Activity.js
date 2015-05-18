var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");

var ProfileList = Backbone.Collection.extend({
    model: App,
    url: 'api/activity/data.json',
    
    initialize: function() {
        // Assign the Deferred issued by fetch() as a property
        this.deferred = this.fetch();
    }
});   

module.exports = ProfileList;