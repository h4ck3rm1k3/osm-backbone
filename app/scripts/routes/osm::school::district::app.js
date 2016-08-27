/*global define*/

define([
  'jquery',
  'backbone'
], function ($, Backbone) {
  'use strict';

  var OsmSchoolDistrictAppRouter = Backbone.Router.extend({
    routes: {
      'about': 'About',
      'contact': 'Contact',
      //'cities': 'Cities',
      'districts': 'Districts',
      'map': 'Map',
      'search': 'Search',
      //'improve': 'Improve',
      //'share': 'Share',      
      //'safe': 'SafeRoutes',
      '': 'Home',
    }

  });

  return OsmSchoolDistrictAppRouter;
});
