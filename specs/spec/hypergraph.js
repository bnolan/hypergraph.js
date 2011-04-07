var BASIC_ENGLISH, CARL_ANNA, NAMES;
describe("hypergraph", function() {
  it("should create graph", function() {
    var graph;
    graph = new HyperGraph;
    return expect(graph instanceof HyperGraph).toBeTruthy();
  });
  it("should create be empty", function() {
    var graph;
    graph = new HyperGraph;
    expect(graph.isEmpty()).toBeTruthy();
    expect(graph.vertexCount()).toEqual(0);
    return expect(graph.edgeCount()).toEqual(0);
  });
  it("should add vertexes", function() {
    var animal, cat, dog, graph;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    expect(graph.vertexCount()).toEqual(1);
    cat = graph.add(new Vertex("cat"));
    animal = graph.add(new Vertex("animal"));
    return expect(graph.vertexCount()).toEqual(3);
  });
  it("should remove vertexes", function() {
    var dog, graph;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    expect(graph.vertexCount()).toEqual(1);
    graph.remove(dog);
    return expect(graph.vertexCount()).toEqual(0);
  });
  it("should add edges", function() {
    var animal, dog, edge, graph;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    animal = graph.add(new Vertex("animal"));
    expect(graph.vertexCount()).toEqual(2);
    edge = graph.addEdge(new Edge([dog, animal]));
    return expect(graph.edgeCount()).toEqual(1);
  });
  it("should remove edges", function() {
    var animal, dog, edge, graph;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    animal = graph.add(new Vertex("animal"));
    edge = graph.addEdge(new Edge([dog, animal]));
    expect(graph.edgeCount()).toEqual(1);
    graph.removeEdge(edge);
    return expect(graph.edgeCount()).toEqual(0);
  });
  return it("should getEdgesForVertex", function() {
    var animal, blue, cat, color, dog, graph, sad;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    cat = graph.add(new Vertex("cat"));
    animal = graph.add(new Vertex("animal"));
    graph.addEdge(new Edge([cat, animal]));
    graph.addEdge(new Edge([dog, animal]));
    blue = graph.add(new Vertex("blue"));
    color = graph.add(new Vertex("color"));
    graph.addEdge(new Edge([blue, color]));
    sad = graph.add(new Vertex("sad"));
    expect(graph.getEdgesForVertex(animal).length).toEqual(2);
    expect(graph.getEdgesForVertex(cat).length).toEqual(1);
    return expect(graph.getEdgesForVertex(sad).length).toEqual(0);
  });
});
describe("edge", function() {
  it("should create", function() {
    var e;
    e = new Edge;
    return expect(e instanceof Edge).toBeTruthy();
  });
  return it("should contain", function() {
    var e, v1, v2, v3;
    v1 = new Vertex;
    v2 = new Vertex;
    v3 = new Vertex;
    e = new Edge([v1, v2]);
    expect(e.contains(v1)).toBeTruthy();
    expect(e.contains(v2)).toBeTruthy();
    return expect(e.contains(v3)).toBeFalsy();
  });
});
describe("vertex", function() {
  return it("should create", function() {
    var dog, graph;
    graph = new HyperGraph;
    dog = graph.add(new Vertex("dog"));
    return expect(dog instanceof Vertex);
  });
});
describe("sentence example", function() {
  var graph;
  graph = new HyperGraph;
  it("should create vertices", function() {
    var word, _i, _j, _len, _len2, _ref, _ref2;
    _ref = BASIC_ENGLISH.split(", ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      word = _ref[_i];
      graph.add(new Vertex(word));
    }
    _ref2 = NAMES.split(", ");
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      word = _ref2[_j];
      graph.add(new Vertex(word));
    }
    return expect(graph.vertexCount()).toEqual(850);
  });
  it("should create edges", function() {
    var sentence, word, words, _i, _len, _ref;
    _ref = CARL_ANNA.split(".");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sentence = _ref[_i];
      words = (function() {
        var _i, _len, _ref, _results;
        _ref = sentence.split(/\b/);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          word = _ref[_i];
          if (word.match(/^[a-z]+$/) && graph.containsVertex(word)) {
            _results.push(graph.getVertex(word));
          }
        }
        return _results;
      })();
      graph.addEdge(new Edge(words));
    }
    return expect(graph.edgeCount()).toEqual(146);
  });
  it("should find edges for carl", function() {
    var vertex;
    vertex = graph.getVertex('carl');
    return expect(vertex.getEdges().length).toEqual(6);
  });
  it("should find edges for anna", function() {
    var vertex;
    vertex = graph.getVertex('anna');
    return expect(vertex.getEdges().length).toEqual(7);
  });
  return it("should find edges for the", function() {
    var vertex;
    vertex = graph.getVertex('the');
    return expect(vertex.getEdges().length).toEqual(77);
  });
});
describe("n-gram example", function() {
  var graph;
  graph = new HyperGraph;
  it("should create vertices", function() {
    var word, _i, _j, _len, _len2, _ref, _ref2;
    _ref = BASIC_ENGLISH.split(", ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      word = _ref[_i];
      graph.add(new Vertex(word));
    }
    _ref2 = NAMES.split(", ");
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      word = _ref2[_j];
      graph.add(new Vertex(word));
    }
    return expect(graph.vertexCount()).toEqual(850);
  });
  it("should create edges", function() {
    var i, sentence, word, words, _i, _len, _ref, _ref2;
    _ref = CARL_ANNA.split(".");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      sentence = _ref[_i];
      words = (function() {
        var _i, _len, _ref, _results;
        _ref = sentence.split(/\b/);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          word = _ref[_i];
          if (word.match(/^[a-z]+$/) && graph.containsVertex(word)) {
            _results.push(graph.getVertex(word));
          }
        }
        return _results;
      })();
      for (i = 0, _ref2 = words.length - 1; (0 <= _ref2 ? i <= _ref2 : i >= _ref2); (0 <= _ref2 ? i += 1 : i -= 1)) {
        graph.addEdge(new Edge(words.slice(i, 2)));
        graph.addEdge(new Edge(words.slice(i, 3)));
      }
    }
    return expect(graph.edgeCount()).toEqual(2890);
  });
  it("should find edges for carl", function() {
    var vertex;
    vertex = graph.getVertex('carl');
    return expect(vertex.getEdges().length).toEqual(4);
  });
  it("should find edges for anna", function() {
    var vertex;
    vertex = graph.getVertex('anna');
    return expect(vertex.getEdges().length).toEqual(10);
  });
  return it("should find edges for the", function() {
    var vertex;
    vertex = graph.getVertex('the');
    return expect(vertex.getEdges().length).toEqual(139);
  });
});
CARL_ANNA = "away over the far-off curve of the earth, which was the limit of the steppe somewhere between europe and asia; there came into view a point smaller than a song-bird. and though it was coming in the direction of the two men at almost a hundred miles an hour, it seemed to be without motion, for ever in the same position in the blue distance, so wide was the stretch of earth and sky, so without limit. though it was moving forward at so great a rate, almost a quarter of an hour had gone by before it was possible to make out the lines of an airplane, and it kept the same distance from the earth all the time, it seemed to be going up in a great curve. balanced high in the heat mist, over the two men, the airman saw, looking down on the steppe, a great black mark like two lines going across one another, very long and very wide, formed by the long, deep holes hollowed out by the two men in the black earth of the steppe. the airman had no idea of the purpose of these holes in the middle of the steppe far from the houses of men. he went on into the west, ever keeping the same distance up, but seeming now to be slipping down in a great curve nearer and nearer to the earth. a quarter of an hour more, and again the size of a small bird, he went from view over the edge of the steppe. the two men were, as before, by themselves in the quiet space. they had no more knowledge than the man in the plane of the purpose of the holes. it seemed to them that possibly they might have been designed for making a wall, so that in time of need one would be able to let water in on the steppe against oncoming armies. at the start of the war when they were first made prisoners, they had been sent here with food, which later came to them month by month, and a small building of iron easily taken to pieces ; and for four summers they had been at work with their spaces, with no one in authority over them. frequently they took long rests ; sometimes they would let half the days go by, sleeping in the grass ; but in the end they had always gone back to work. for a man has to do something. all the time birds went back and forward, looking for food. there seemed to be a great quiet in the thousand-voiced, ever-changing music of the grass-insects, as though the earth had come to the middle point of existence, and was waiting with ears wide open. the pickaxe went through a worm, cutting it in half. lifting the half worm out of the earth, the man sent it up into the air. it was taken by a bird in flight. my place was on the inside of the bed, by the wall, and hers on the outside ; and when she got up in the morning she did so without me hearing her. she was very quiet, do you see ? -- so very, very quiet. you have said that before. you would not get up before the whistle of the gas-flame come to your ears. that is so ; every time it made the same note. frequently i was going to put it right. but then i had to go to the war. the married man went on with his work. the hair on his face was long, and uncared for. his friend was stretched out on the grass near him. he took a piece of grass in his mouth, and then another. the question i frequently put to myself is, 'why is it that the upper part of her body is so white, and the rest of her body and her legs a so much deeper color?' and when the married man made no answer : like copper, you say ? when you have her, you have no thought of anything but her. half an hour later, without any cause so it seemed, the cloud of birds took wing, and came down at a point farther off from the two men. then they came back to them. again they did this, and again. so great was their number that the sky was almost shut out when they were in flight. the man went on talking, but that is almost four years back. sometimes the memory of her goes completely. i am unable to see her face, quite unable to see it ! it all gets clouded, carl. but when she comes to me in sleep, she is so living, it would be possible to have the feeling that one was touching her. i've got a clear picture of her. everything ! . . . and what sort of woman she is. everything ! but you have not ever seen her . . . i would be with her in such a short time if i was in that airplane, though she is so far off . . . who is able to put up with so much ? four years ! at least there is somebody living who has you in her thoughts. yes, that's so. that's very true. someone who's there, waiting for you. but i -- when i let myself have such thoughts -- there's nothing there at all. yes, she's waiting. if she's living after all these years. she's living, the other quickly made answer. and, seating himself in the grass again, he let his eyes go out across the steppe. he saw the woman he had not seen. he saw her dusting the furniture in the little room he had not ever been in, saw her go across to the day-bed and make the cover smooth. there she was, bent down over it. the bed came out at an angle into the room. so detailed was his knowledge. and he saw the color of the cover and the design on it. richard ! if she was here now, married to you, would you -- richard, would you let me have her, for one time only ? the married man put his two hands on the spade, and his chin came to rest on them. if she was here now -- he was unable to take in the idea. give me an answer. for a long time he kept his eyes on the man at his side. possibly -- because we are in the same trouble together. for one time. . . . possibly. . . . but if you made a second attempt, you would get your head smashed in with this pickaxe. the gas ! does it make the same noise as before the grass became shaded by a cloud. the song of the insects seemed to go farther and farther off into the steppe, and at last was out of hearing. from quite near by came one short note. the last insect came to the end of its song. in the complete quiet the two men were suddenly conscious of the rhythm of their blood. in the distance, the rays of the sun made parts of the steppe like brightly flaming gold. the sun overcame the shade of the cloud, lighting up the grass. the summer noise, with its thousand voices, came into being again, now loud, now soft, stretching from one edge of the steppe to the other. not one blade of grass was moving. but anna would not do it. she is not for other men. . . . i've given you the story of how it was, on our first night together, the trouble i had . she was over twenty-three then -- but i have said all this before. so, you may see for yourself, carl. for four long summers, with nothing to take his thoughts off his desires, he had kept no secrets from his friend ; and normally he was a man who said little. looking back, the worst times seemed in some way happy, the hard work, day after day, in order that one might have bread and keep a roof over one's head. for now it was being all by oneself that was so hard ; and the present, the weight of it. carl, who had gone through all this with him, had knowledge of everything -- that the bed-cushion was in three parts, and the lines of anna's body curved and well-marked ; that her desires had first to overcome her delicate feelings ; that she was then a woman of power, but that at other times she was very quiet, quick with her fingers, and kept the house clean and in order. the fork for getting the burned-out coals away from the fireplace had a brass hand-piece. anna had three small birth-marks, brown like a piece of silk. he was able to give the position of the oven, to say where the coal-fork was kept, and where the three marks were. because he had no one and nothing which was his, the picture of anna had become clear to him. but what if she has not been true to you while you have been away from her, and taken another man ? four years is a long time, richard, for a woman whose blood is warm. . . . possibly you would not be so slow, if there were women in the grass in place of insects. here is something which may be new to you. when anna and i came into the town, we were able to get a little room, and directly we got it we put furniture into it which we were getting on the part-payment system. a week later i had to go to the war. you have said all that before. payments of six marks every month. but before the news came that i was to go, we said to ourselves : now if we keep on to our room, all will be well. and i am certain that anna has gone on with that idea. she's got no time for those other thoughts. it will take all her care to keep our little place together. perhaps that is why she ----- what has that to do with you ? keep a clean tongue in your head, at least. and as for anna, i would ----- but i am certain. she would not do a thing like that ! he took up his pickaxe and sent it down violently into the earth. desire, without the power to give force to his desire, had frequently made him put all his heart into working at those holes, holes which had no purpose ; and now as he went on, lifting and dropping his pickaxe, his doubts were crushed down by the hard work. when a boy of two, carl had made a cart out of his mother's hat. it had long bands, and he had put himself like a horse between the bands and gone out across the square, through the holes full of rainwater, pulling the new hat after him wherever he went. after that experience his power of making thought-pictures had given him more pain than pleasure. resting where he was, not moving, all sorts of fears came into his head. then the sun went down, and richard's pickaxe, lifted up in the air, made a great shade outline on the grass. the west was flaming with the fires of sundown. the red-gold wheel had not quite come to rest on the edge of the steppe. now, only the points of the grass near the two men were touched by the gold light. farther on, the steppe was a deep black-green, and in the far east night was coming up into the sky. the noise of the insects seemed out of all control there was a wet smell about the warm air. like a good iron-worker who, when his day's work is done, put things ready for the day to come. richard got all the loose earth out of the hole before he put on his coat. when they had been walking for a quarter hour, their boots were so wet that they made a noise with every step. the deep color had gone out of the sky. the iron house seemed cold and dead in the gray, unbroken stretch of the steppe. the morning after they went to the prison buildings to get their food. they had done the journey every month for four summers, a day's walk there and a day's walk back, one walking in front of the other. the grass came up again after their feet had made it flat. when they had gone there was little sign that they had been that way. carl and richard were metal-workers. one was as tall as the other, and their skin had that dark color common to men of their trade. at the prison, a group of prisoners were ready to go off somewhere. we will take one of those two to make up the number, said the man in authority, and gave richard's name. five minutes later, without having had time to say a last work to carl, he was walking with the others to the railway station, from which all the company was sent some days' journey east. ";
BASIC_ENGLISH = "come, get, give, go, keep, let, make, put, seem, take, be, do, have, say, see, send, may, will, about, across, after, against, among, at, before, between, by, down, from, in, off, on, over, through, to, under, up, with, as, for, of, till, than, a , the, all, any, every, little, much, no, other, some, such, that, this, I , he, you, who, and, because, but, or, if, though, while, how, when, where, why, again, ever, far, forward, here, near, now, out, still, then, there, together, well, almost, enough, even, not, only, quite, so, very, tomorrow, yesterday, north, south, east, west, please, yes, account, act, addition, adjustment, advertisement, agreement, air, amount, amusement, animal, answer, apparatus, approval, argument, art, attack, attempt, attention, attraction, authority, back, balance, base, behavior, belief, birth, bit, bite, blood, blow, body, brass, bread, breath, brother, building, burn, burst, business, butter, canvas, care, cause, chalk, chance, change, cloth, coal, color, comfort, committee, company, comparison, competition, condition, connection, control, cook, copper, copy, cork, cotton, cough, country, cover, crack, credit, crime, crush, cry ,current, curve, damage, danger, daughter, day, death, debt, decision, degree, design, desire, destruction, detail, development, digestion, direction, discovery, discussion, disease, disgust, distance, distribution, division, doubt, drink, driving, dust, earth, edge, education, effect, end, error, event, example, exchange, existence, expansion, experience, expert, fact, fall, family, father, fear, feeling, fiction, field, fight, fire, flame, flight, flower, fold, food, force, form, friend, front, fruit, glass, gold, government, grain, grass, grip, group, growth, guide, harbor, harmony, hate, hearing, heat, help, history, hole, hope, hour, humor, ice, idea, impulse, increase, industry, ink, insect, instrument, insurance, interest, invention, iron, jelly, join, journey, judge, jump, kick, kiss, knowledge, land, language, laugh, law, lead, learning, leather, letter, level, lift, light, limit, linen, liquid, list, look, loss, love, machine, man, manager, mark, market, mass, meal, measure, meat, meeting, memory, metal, middle, milk, mind, mine, minute, mist, money, month, morning ,mother, motion, mountain, move, music, name, nation, need, news, night, noise, note, number, observation, offer, oil, operation, opinion, order, organization, ornament, owner, page, pain, paint, paper, part, paste, payment, peace, person, place, plant, play, pleasure, point, poison, polish, porter, position, powder, power, price, print, process, produce, profit, property, prose, protest, pull, punishment, purpose, push, quality, question, rain, range, rate, ray, reaction, reading, reason, record, regret, relation, religion, representative, request, respect, rest, reward, rhythm, rice, river, road, roll, room, rub, rule, run, salt, sand, scale, science, sea, seat, secretary, selection, self, sense, servant, sex, shade, shake, shame, shock, side, sign, silk, silver, sister, size, sky, sleep, slip, slope, smash, smell, smile, smoke, sneeze, snow, soap, society, son, song, sort, sound, soup, space, stage, start, statement, steam, steel, step, stitch, stone, stop, story, stretch, structure, substance, sugar, suggestion, summer, support, surprise, swim, system, talk, taste, tax, teaching, tendency, test, theory, thing, thought, thunder, time, tin, top, touch, trade, transport, trick, trouble, turn, twist, unit, use, value, verse, vessel, view, voice, walk, war, wash, waste, water, wave, wax, way, weather, week, weight, wind, wine, winter, woman, wood, wool, word, work, wound, writing , year, angle, ant, apple, arch, arm, army, baby, bag, ball, band, basin, basket, bath, bed, bee, bell, berry, bird, blade, board, boat, bone, book, boot, bottle, box, boy, brain, brake, branch, brick, bridge, brush, bucket, bulb, button, cake, camera, card, cart, carriage, cat, chain, cheese, chest, chin, church, circle, clock, cloud, coat, collar, comb, cord, cow, cup, curtain, cushion, dog, door, drain, drawer, dress, drop, ear, egg, engine, eye, face, farm, feather, finger, fish, flag, floor, fly, foot, fork, fowl, frame, garden, girl, glove, goat, gun, hair, hammer, hand, hat, head, heart, hook, horn, horse, hospital, house, island, jewel, kettle, key, knee, knife, knot, leaf, leg, library, line, lip, lock, map, match, monkey, moon, mouth, muscle, nail, neck, needle, nerve, net, nose, nut, office, orange, oven, parcel, pen, pencil, picture, pig, pin, pipe, plane, plate, plough/plow, pocket, pot, potato, prison, pump, rail, rat, receipt, ring, rod, roof, root, sail, school, scissors, screw, seed, sheep, shelf, ship, shirt, shoe, skin, skirt, snake, sock, spade, sponge, spoon, spring, square, stamp, star, station, stem, stick, stocking, stomach, store, street, sun, table, tail, thread, throat, thumb, ticket, toe, tongue, tooth, town, train, tray, tree, trousers, umbrella, wall, watch, wheel, whip, whistle, window, wing, wire, worm, able, acid, angry, automatic, beautiful, black, boiling, bright, broken, brown, cheap, chemical, chief, clean, clear, common, complex, conscious, cut, deep, dependent, early, elastic, electric, equal, fat, fertile, first, fixed, flat, free, frequent, full, general, good, great, grey/gray, hanging, happy, hard, healthy, high, hollow, important, kind, like, living, long, male, married, material, medical, military, natural, necessary, new, normal, open, parallel, past, physical, political, poor, possible, present, private, probable, quick, quiet, ready, red, regular, responsible, right, round, same, second, separate, serious, sharp, smooth, sticky, stiff, straight, strong, sudden, sweet, tall, thick, tight, tired, true, violent, waiting, warm, wet, wide, wise, yellow, young, awake, bad, bent, bitter, blue, certain, cold, complete, cruel, dark, dead, dear, delicate, different, dirty, dry, false, feeble, female, foolish, future, green, ill, last, late, left, loose, loud, low, mixed, narrow, old, opposite, public, rough, sad, safe, secret, short, shut, simple, slow, small, soft, solid, special, strange, thin, white, wrong";
NAMES = "carl, anna";