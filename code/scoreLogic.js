inlets = 1;
outlets = 1;

var initializeScoreMessages = [
  // staves, width, height
  ["newScore", 2, 800, 840],
  ["showTimeSignatures", 0],
  ["showTempo", 0],
  ["showMeasureNumbers", 0],
  ["setClef", 0, 0, "TREBLE_CLEF"],
  ["setClef", 0, 1, "BASS_CLEF"],
];

function generateInitialMiniScoreSettings(width, height, clef) {
  return [
    // staves, width, height
    ["newScore", 1, width, height],
    ["showTimeSignatures", 0],
    ["showMeasureNumbers", 0],
    ["showTempo", 0],
    ["setClef", 0, 0, clef == "bass" ? "BASS_CLEF" : "TREBLE_CLEF"],
  ];
}

function initializeMiniScore() {
  var miniScoreMessages = generateInitialMiniScoreSettings(740, 120);

  miniScoreMessages.forEach(function(msgArr) {
    outlet(0, msgArr)
  });
}

// HELPERS
function isAccidental(keyNo) {
  var firstOctKey = keyNo % 12;
  return firstOctKey == 1 || firstOctKey == 3 || firstOctKey == 6 || firstOctKey == 8 || firstOctKey == 10;
}

function countAccidentals(rootedIntNotation) {
  var numberOfAccidentals = 0;

  rootedIntNotation.forEach(function(keyNo) {
    if (isAccidental(keyNo)) {
      numberOfAccidentals++;
    }
  })

  return numberOfAccidentals;
}

function calculateSpelling(numberOfAccidentals, rootNote) {
    switch (numberOfAccidentals) {
      case 0:
        return "SHARP_KEY";
      case 1:
        return rootNote == 5 ? "FLAT_KEY" : "SHARP_KEY";
      case 2:
        return rootNote == 10 ? "FLAT_KEY" : "SHARP_KEY";
      case 3:
        return rootNote == 3 ? "FLAT_KEY" : "SHARP_KEY";
      case 4:
        return rootNote == 8 ? "FLAT_KEY" : "SHARP_KEY";
      case 5:
        return rootNote == 1 ? "FLAT_KEY" : "SHARP_KEY";
      case 6:
        return rootNote == 6 ? "FLAT_KEY" : "SHARP_KEY";
      case 7:
        return rootNote == 11 ? "FLAT_KEY" : "SHARP_KEY";
    }

}

// OUTPUT FUNCTIONS
function outputKeySignature() { 
  var rootedIntNotation = arrayfromargs(arguments);
  var rootNote = rootedIntNotation.shift();
  var numberOfAccidentals = countAccidentals(rootedIntNotation);
  var scaleSpelling = calculateSpelling(numberOfAccidentals, rootNote);

  // outlet(0, "setKeySignature", 0, 0, numberOfAccidentals, scaleSpelling)
}

function outputScaleNotes() {
  var rootedIntNotation = arrayfromargs(arguments);
  var rootNote = rootedIntNotation.shift();
  var index = rootedIntNotation.indexOf(rootNote); 
  var beforeRoot = rootedIntNotation.slice(0, index).map(function(interval) { return interval + 12});
  var afterRoot = rootedIntNotation.slice(index);
  var orderedRootedIntNotationWithTopNote = afterRoot.concat(beforeRoot);
  orderedRootedIntNotationWithTopNote.push(rootNote + 12);

  orderedRootedIntNotationWithTopNote.forEach(function(noteInt) {
    var adjustedNote = noteInt + 60;
    outlet(0, "addNote", 1, adjustedNote, 0.5, 0.8)
  })
}

function outputChordNotes() {
  var rootedIntNotation = arrayfromargs(arguments);

  post("rootedIntNotation" + "\n")
  post(JSON.stringify(rootedIntNotation) + "\n")

  rootedIntNotation.forEach(function(noteInt, i) {
    var adjustedNote = noteInt + 60;

    if (i == 0) {
      outlet(0, "addNote", 4, adjustedNote, 0.5, 0.8)
    } else {
      outlet(0, "addInterval", adjustedNote)
    }
  })
}