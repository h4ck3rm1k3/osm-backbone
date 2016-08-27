/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreNodes'
], function (_, Backbone, OsmCoreNodesModel) {
  'use strict';

  var OsmCoreNodesCollection = Backbone.Collection.extend({
    model: OsmCoreNodesModel
  });

  return OsmCoreNodesCollection;
});
