/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreChangeSets'
], function (_, Backbone, OsmCoreChangeSetsModel) {
  'use strict';

  var OsmCoreChangeSetsCollection = Backbone.Collection.extend({
    model: OsmCoreChangeSetsModel
  });

  return OsmCoreChangeSetsCollection;
});
