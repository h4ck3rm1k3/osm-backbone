/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var OsmOverpassApiModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    },


  xp2: function (xpath, context, node) {
    // from https://github.com/jfirebaugh/jquery-xpath/blob/master/jquery.xpath.js
    // XPath - jQuery wrapper for the DOM 3 XPath API exposed by document.evaluate()
    // Copyright © 2010 John Firebaugh
    var iterator = context.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null),
        node     = iterator.iterateNext(),
        nodes    = [];
    
    while (node) {
      nodes.push(node);
      node = iterator.iterateNext();
    }
    
    return nodes;
  },

  collect_tags: function (context, data) {

    rdata = {}
    
    tags = xp2( "./tag", context ,data)
    for (i=0;i<tags.length;i++)
    {
      t = tags[i];
      //console.log(t);
      k = t.getAttribute('k');
      v = t.getAttribute('v');
      
      rdata[k]=v;
      //console.log("key:" +k +" val:" +v);
    }
    
    return rdata;
  },

  collect_ids : function (context, data) {
    
    var iterator = context.evaluate("./member", data, null, XPathResult.ANY_TYPE, null),
        node     = iterator.iterateNext(),
        nodes    = {}
    
    while (node) {
      
      ref = node.getAttribute('ref')
      type = node.getAttribute('type')
      role = node.getAttribute('role')
      
      nodes[ref]=role
      
      node = iterator.iterateNext();
    }
    
    return nodes;
  },


  relation: function (r) {
    tags = {}
    nodes = {}
    for (i=0;i<r.children.length;i++)
    {
      d = r.children[i];
      ln = d.localName;
      switch (ln) {
        case 'member' :     
        ref = d.getAttribute('ref')
        role = d.getAttribute('role')	    
        nodes[ref]=role    
        break      
        case 'tag' :
        k = d.getAttribute('k')
        v = d.getAttribute('v')
        tags[k]=v;
        break;
        default:
        console.log(ln);	    
      }	
    }
    return {
      'nodes' : nodes,
      'tags'  : tags
    }
  },

  getxml_rel:function (data){
    rdata = {} 
    for (i=0;i<data.children.length;i++)
    {
      var d = data.children[i];  
      if (d.children === null) {
        console.log(d.children);
        break;
      }
      for (j=0;j<d.children.length;j++)
      {
        var d2 = d.children[j];
        ln = d2.localName;
        switch (ln) {
	  case 'relation' :
	  d3 = relation(d2);
	  a = d3['tags']['abbr'];
          
	  if ( a != undefined){
	    //console.log(a);
	    rdata[a]=d3;
	  }
	  break;
	  case 'note' :
	  break;
	  case 'meta' :
	  break;
	  default:		
        }
      }
    }
    
    return rdata
  },

  query : function (query,func ) {
    url = "http://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query)
    var rdata;
    
    g2 = localStorage.getItem('querydata2:'+query);
    
    if (g2 === null){
      
      g = localStorage.getItem('querydata:'+query)
      if (g === null){
        console.log("data was null")
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
	    data = xmlhttp.responseText
	    console.log("saving data to cache")
	    //console.log(data)
	    localStorage.setItem('querydata:'+query, data);
          }
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        console.log("getting data from cache")
        g = localStorage.getItem('querydata:'+query)
        console.log("got new data")
        
      }
      else
      {
        console.log("using cached data")
      }
      //console.log(g);
      var xml = $.parseXML(g);
      //console.log(xml);
      
      rdata = func(xml);
      
      json = JSON.stringify(rdata);
      localStorage.setItem('querydata2:'+query, json);	
    }
    else {
      console.log("using cached json data")
      rdata = JSON.parse(g2);	
    }
    
    return rdata;
  },
  query_lawrence : function (query,func ) {
    var query= '(relation["name"="Lawrence Township School Districts"];>;); (._; rel(r); );(._; rel(r); ); out meta;';
    d = this.query(query,getxml_rel);
    return d;    
  }

  });

  return OsmOverpassApiModel;
});
