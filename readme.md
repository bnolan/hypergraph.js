# Hypergraph.js

A [hypergraph](http://en.wikipedia.org/wiki/Hypergraph) library in Javascript, part of some work on an AI chatbot. I've tried to copy the API of [hypergraphdb](http://www.hypergraphdb.org/). The graph has tests in Jasmine.

## Usage

    graph = new HyperGraph

    dog = graph.add(new Vertex("dog"))
    cat = graph.add(new Vertex("cat"))
    animal = graph.add(new Vertex("animal"))

    edge = graph.addEdge(new Edge([dog, animal]));
    edge = graph.addEdge(new Edge([cat, animal]));

    graph.getEdgesForVertex('animal') => [Edge([animal, cat]), Edge([animal, dog])]

    graph.getVertex("dog") => Vertex(...)
