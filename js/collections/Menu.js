var Backbone = require("../libs/backbone.js");
var App = require("../models/App.js");

var ProfileList = Backbone.Collection.extend({
    model: App,
    url: 'api/data.json'
});   

module.exports = ProfileList;