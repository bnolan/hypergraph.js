
class Vertex
  constructor: (key) ->
    @_key = key
    
  key: ->
    @_key

  getEdges: ->
    unless @graph
      throw "Vertex is not associated with a graph"
      
    @graph.getEdgesForVertex(this)
    
    
class Edge
  constructor: (vertices) ->
    @_vertices = vertices
    
  contains: (vertex) ->
    for v in @_vertices when v == vertex
      return true
    
    false

class HyperGraph
  constructor: ->
    @edges = []
    @vertices = {}
    
  # Add a vertex to the graph, returns the vertex
  add: (vertex) ->
    unless vertex instanceof Vertex
      throw "Parameter is not a vertex"
      
    if vertex.graph
      throw "Vertex is associated with different graph"

    if @_getVertexByKey(vertex.key())
      throw "Vertex already exists"

    @vertices[vertex.key()] = vertex
    vertex.graph = this
    vertex
    
  containsVertex: (key) ->
    !!@_getVertexByKey(key)

  getVertex: (key) ->
    if @_getVertexByKey(key)
      @_getVertexByKey(key)
    else
      throw("Key not found in graph")
    
  _getVertexByKey: (key) ->
    @vertices[key]
    
  # Remove a vertex that is part of the graph
  remove: (vertex) ->
    unless vertex instanceof Vertex # Sanity check
      throw "Parameter is not a vertex"
      
    unless vertex.graph == this # Check it's associated with this graph
      throw "Vertex is not associated with this graph"

    unless @_getVertexByKey(vertex.key()) # Something bad happened
      throw "Vertex not found in this graph"
      
    delete @vertices[vertex.key()]
        
  # Return number of vertices in the graph
  vertexCount: ->
    Object.keys(@vertices).length

  # Return number of edges in the graph
  edgeCount: ->
    @edges.length

  # No point checking edges, since you can't have edges with no vertices
  isEmpty: ->
    @vertexCount() == 0

  addEdge: (edge) ->
    @edges.push edge
    edge.graph = this
    edge
    
  removeEdge: (edge) ->
    unless edge instanceof Edge # Sanity check
      throw "Parameter is not an edge"
      
    unless edge.graph == this # Check it's associated with this graph
      throw "Edge is not associated with this graph"

    @edges = for e in @edges when e != edge
      e
      
  getEdgesForVertex: (vertex) ->
    for e in @edges when e.contains(vertex)
      e
    