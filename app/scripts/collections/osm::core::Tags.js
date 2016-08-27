/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmCoreTags'
], function (_, Backbone, OsmCoreTagsModel) {
  'use strict';

  var OsmCoreTagsCollection = Backbone.Collection.extend({
    model: OsmCoreTagsModel
  });

  return OsmCoreTagsCollection;
});
