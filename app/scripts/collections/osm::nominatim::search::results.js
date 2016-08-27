/*global define*/

define([
  'underscore',
  'backbone',
  'models/OsmNominatimSearchResults'
], function (_, Backbone, OsmNominatimSearchResultsModel) {
  'use strict';

  var OsmNominatimSearchResultsCollection = Backbone.Collection.extend({
    model: OsmNominatimSearchResultsModel
  });

  return OsmNominatimSearchResultsCollection;
});
