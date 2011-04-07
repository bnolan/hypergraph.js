var Edge, HyperGraph, Vertex;
Vertex = (function() {
  function Vertex(key) {
    this._key = key;
  }
  Vertex.prototype.key = function() {
    return this._key;
  };
  Vertex.prototype.getEdges = function() {
    if (!this.graph) {
      throw "Vertex is not associated with a graph";
    }
    return this.graph.getEdgesForVertex(this);
  };
  return Vertex;
})();
Edge = (function() {
  function Edge(vertices) {
    this._vertices = vertices;
  }
  Edge.prototype.contains = function(vertex) {
    var v, _i, _len, _ref;
    _ref = this._vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      v = _ref[_i];
      if (v === vertex) {
        return true;
      }
    }
    return false;
  };
  return Edge;
})();
HyperGraph = (function() {
  function HyperGraph() {
    this.edges = [];
    this.vertices = {};
  }
  HyperGraph.prototype.add = function(vertex) {
    if (!(vertex instanceof Vertex)) {
      throw "Parameter is not a vertex";
    }
    if (vertex.graph) {
      throw "Vertex is associated with different graph";
    }
    if (this._getVertexByKey(vertex.key())) {
      throw "Vertex already exists";
    }
    this.vertices[vertex.key()] = vertex;
    vertex.graph = this;
    return vertex;
  };
  HyperGraph.prototype.containsVertex = function(key) {
    return !!this._getVertexByKey(key);
  };
  HyperGraph.prototype.getVertex = function(key) {
    if (this._getVertexByKey(key)) {
      return this._getVertexByKey(key);
    } else {
      throw "Key not found in graph";
    }
  };
  HyperGraph.prototype._getVertexByKey = function(key) {
    return this.vertices[key];
  };
  HyperGraph.prototype.remove = function(vertex) {
    if (!(vertex instanceof Vertex)) {
      throw "Parameter is not a vertex";
    }
    if (vertex.graph !== this) {
      throw "Vertex is not associated with this graph";
    }
    if (!this._getVertexByKey(vertex.key())) {
      throw "Vertex not found in this graph";
    }
    return delete this.vertices[vertex.key()];
  };
  HyperGraph.prototype.vertexCount = function() {
    return Object.keys(this.vertices).length;
  };
  HyperGraph.prototype.edgeCount = function() {
    return this.edges.length;
  };
  HyperGraph.prototype.isEmpty = function() {
    return this.vertexCount() === 0;
  };
  HyperGraph.prototype.addEdge = function(edge) {
    this.edges.push(edge);
    edge.graph = this;
    return edge;
  };
  HyperGraph.prototype.removeEdge = function(edge) {
    var e;
    if (!(edge instanceof Edge)) {
      throw "Parameter is not an edge";
    }
    if (edge.graph !== this) {
      throw "Edge is not associated with this graph";
    }
    return this.edges = (function() {
      var _i, _len, _ref, _results;
      _ref = this.edges;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        e = _ref[_i];
        if (e !== edge) {
          _results.push(e);
        }
      }
      return _results;
    }).call(this);
  };
  HyperGraph.prototype.getEdgesForVertex = function(vertex) {
    var e, _i, _len, _ref, _results;
    _ref = this.edges;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.contains(vertex)) {
        _results.push(e);
      }
    }
    return _results;
  };
  return HyperGraph;
})();