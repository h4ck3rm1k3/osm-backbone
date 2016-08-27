/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreUsers'
], function (_, Backbone, OsmCoreUsersModel) {
  'use strict';

  var OsmCoreUsersCollection = Backbone.Collection.extend({
    model: OsmCoreUsersModel
  });

  return OsmCoreUsersCollection;
});
