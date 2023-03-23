exports.chordsArr = [
  {
    name: "Major Triad",
    intNotation: [0, 4, 7],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Augmented",
    intNotation: [0, 4, 8],
    quality: "Augmented",
    source: "factory",
  },
  {
    name: "Augmented 11th",
    intNotation: [0, 4, 7, 10, 2, 6],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Augmented Major 7th",
    intNotation: [0, 4, 8, 11],
    quality: "Augmented",
    source: "factory",
  },
  {
    name: "Augmented 7th",
    intNotation: [0, 4, 8, 10],
    quality: "Augmented",
    source: "factory",
  },
  {
    name: "Augmented 6th (Italian)",
    intNotation: [0, 4, 10],
    quality: "Predominant",
    source: "factory",
  },
  {
    name: "Augmented 6th (French)",
    intNotation: [0, 4, 6, 10],
    quality: "Predominant",
    source: "factory",
  },
  {
    name: "Augmented 6th (German)",
    intNotation: [0, 4, 7, 10],
    quality: "Predominant",
    source: "factory",
  },
  {
    name: "Diminished",
    intNotation: [0, 3, 6],
    quality: "Diminished",
    source: "factory",
  },
  {
    name: "Diminished Major 7th",
    intNotation: [0, 3, 6, 11],
    quality: "Diminished",
    source: "factory",
  },
  {
    name: "Diminished 7th",
    intNotation: [0, 3, 6, 9],
    quality: "Diminished",
    source: "factory",
  },
  {
    name: "Dominant",
    intNotation: [0, 4, 7],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Dominant 11th",
    intNotation: [0, 4, 7, 10, 14, 17],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Dominant Minor 9th",
    intNotation: [0, 4, 7, 10, 13],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Dominant 9th",
    intNotation: [0, 4, 7, 10, 14],
    quality: "Major",
    source: "factory",
  },
  {
    name: "Dominant Parallel",
    intNotation: [0, 3, 7],
    quality: "Minor",
    source: "factory",
  },
];

function addChord (name, intNotation, quality) {
  chordsArr.push({
    name: name,
    intNotation: intNotation,
    quality: quality,
    source: "user",
  });
}

function removeChord (name) {
  // find chord
  var chordToRemove = chordsArr.filter(function(chord) {
    return chord.name == name;
  })

  // check for found chord and whether it is a user chord
  if (chordToRemove.length > 0 && chordToRemove[0].source == "user") {
    var filteredChordsArr = chordsArr.filter(function(chord) {
      return chord.name != name;
    })

    // if Chord was found and source is ok, reassign chords to filtered arr
    chordsArr = filteredChordsArr;
  }

  post("REMOVE CHORD" + "\n")
  post(name + "\n")
  post(JSON.stringify(chordToRemove) + "\n")
  post(JSON.stringify(chordsArr) + "\n")
}