# Hypergraph.js

A [hypergraph](http://en.wikipedia.org/wiki/Hypergraph) library in Javascript, part of some work on an AI chatbot. I've tried to copy the API of [hypergraphdb](http://www.hypergraphdb.org/). The graph has tests in Jasmine.

## Usage

graph = new HyperGraph

dog = graph.add(new Vertex("dog"))
cat = graph.add(new Vertex("cat"))
animal = graph.add(new Vertex("animal"))

edge = graph.addEdge([dog, animal]);
edge = graph.addEdge([cat, animal]);

graph.findEdgesContaining('animal')

[
  Edge([animal, cat]),
  Edge([animal, dog])
]

graph.findEdgesContaining('animal')

graph.get

 Book mybook = new Book("Critique of Pure Reason", "E. Kant");  
 HGHandle bookHandle = graph.add(mybook);
 HGHandle priceHandle = graph.add(9.95);
 HGValueLink link = new HGValueLink("book_price", bookHandle, priceHandle);
