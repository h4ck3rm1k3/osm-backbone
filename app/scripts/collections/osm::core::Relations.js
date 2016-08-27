/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreRelations'
], function (_, Backbone, OsmCoreRelationsModel) {
  'use strict';

  var OsmCoreRelationsCollection = Backbone.Collection.extend({
    model: OsmCoreRelationsModel
  });

  return OsmCoreRelationsCollection;
});
