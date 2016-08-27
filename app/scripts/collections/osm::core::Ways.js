/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreWays'
], function (_, Backbone, OsmCoreWaysModel) {
  'use strict';

  var OsmCoreWaysCollection = Backbone.Collection.extend({
    model: OsmCoreWaysModel
  });

  return OsmCoreWaysCollection;
});
