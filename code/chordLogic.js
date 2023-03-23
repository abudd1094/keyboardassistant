// chord, root, inversion, octave, keyboard offset, chord source, mode
inlets = 7;
// scale int notation, note name string, chord name string, chord quality, to scoreLogic.js
outlets = 5;

var { chordsArr } = require("chords");
var { read } = require("filesystem");
var { primaryMenuParams, primaryMenuTabs } = require("umenuLogic.js");

var userChords = read("userChords.json") || [];

var storedChordUmenu;
var storedUmenuTabs; 
// factory from chords.js or user from userChords.json
var chordSource = 0;
// initialize to off
var selectedChordObj = chordSource == 0 ? chordsArr[0] : userChords[0];
// initialize root to C
var rootNote = 0;
var rootedIntNotation = adjustIntNotationToRoot();
var inversion = 0;
var keyboardOffset = 36;
var octave = 2;
var mode = 0;

if (jsarguments.length > 1) output = jsarguments[1]; 

function adjustIntNotationToRoot() {
  return selectedChordObj.intNotation
    .map(function (int) {
      var adjustedNote = rootNote + int;

      return adjustedNote;
    })
    .sort(function (a, b) { 
      return a - b;
    });
}

// RECEPTION FUNCTIONS
function msg_int(v) {
  // set chord
  if (inlet == 0) {
    if (chordSource == 0) {
      selectedChordObj = chordsArr[v];
    }

    if (chordSource == 1) {
      var userChords = read("userChords.json") || [];
      selectedChordObj = userChords[v];
    }
    
    rootedIntNotation = adjustIntNotationToRoot();
  }

  // set root note
  if (inlet == 1) {
    rootNote = v;
    rootedIntNotation = adjustIntNotationToRoot();
  }

  // set inversion
  if (inlet == 2) {
    inversion = v;
    rootedIntNotation = adjustIntNotationToRoot();
  }

  // set octave
  if (inlet == 3) {
    octave = v;
  }

  // set keyboard offset
  if (inlet == 4) {
    keyboardOffset = v;
  }

  // set chord source
  if (inlet == 5) {
    chordSource = v;
    repopulateStoredChordUmenu();
  }

  // set chord source
  if (inlet == 6) {
    mode = v;
  }

  bang();
}

function bang() {
  if (mode == 2) {
    outputSelectedChord();
  }
}

// OUTPUT FUNCTIONS 
function outputSelectedChord() { 
  outlet(2, selectedChordObj.name);
  outlet(3, selectedChordObj.info);
  var rootedIntNotationWithInversion = rootedIntNotation.slice();
  var rootedIntNotationWithVelocities = [];
  // 2 octave offset
  var noteOffset = octave * 12;

  switch (inversion) {
    case 0:
      break;
    case 1:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 1);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      break;
    case 2:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 2);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      break;
    case 3:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 3);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[2] + 12);
      break;
    case 4:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 4);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[2] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[3] + 12);
      break;
    case 5:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 5);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[2] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[3] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[4] + 12);
      break;
    case 6:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 6);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[2] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[3] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[4] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[5] + 12);
      break;
    case 5:
      var invertedNotes = rootedIntNotationWithInversion.splice(0, 6);
      rootedIntNotationWithInversion.push(invertedNotes[0] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[1] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[2] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[3] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[4] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[5] + 12);
      rootedIntNotationWithInversion.push(invertedNotes[6] + 12);
      break;
    default:
      break;
  }

  for (var j = 0; j < rootedIntNotationWithInversion.length; j++) {
    rootedIntNotationWithVelocities.push(
      rootedIntNotationWithInversion[j] + noteOffset + keyboardOffset
    );
    rootedIntNotationWithVelocities.push(127);
  }

  outlet(0, rootedIntNotationWithVelocities);
  outlet(4, "initializeMiniScore");
  outlet(4, "outputChordNotes", rootedIntNotationWithInversion); 
}

// PATCHER FUNCTIONS
function renderUmenu() {
  if (!storedChordUmenu) {
    var chordUmenu = this.patcher.newdefault(primaryMenuParams(417, 212));
    storedChordUmenu = chordUmenu;
    var chordDial = this.patcher.getnamed("dial_chord");

    this.patcher.connect(chordDial,0,chordUmenu,0);
    this.patcher.connect(chordUmenu,0,chordDial,0);

    chordsArr.forEach(function(chordObj) {
      chordUmenu.message("append", chordObj.name)
    });
  } else {
    error("umenu already exists! \n")
  }

  if (!storedUmenuTabs) {
    var chordLogic = this.patcher.getnamed("chordLogic");
    var umenuTabs = this.patcher.newdefault(primaryMenuTabs(417, 184));
    umenuTabs.message("set", 0);
    storedUmenuTabs = umenuTabs;

    this.patcher.connect(umenuTabs,0,chordLogic,5);
  } else {
    error("umenu tabs already exists! \n")
  }

  bang();
}

function removeUmenu() {
  if (storedChordUmenu) {
    this.patcher.remove(storedChordUmenu);
    storedChordUmenu = null;
  }
  if (storedUmenuTabs) {
    this.patcher.remove(storedUmenuTabs);
    storedUmenuTabs = null;
  }
  bang();
}

function repopulateStoredChordUmenu() {
  storedChordUmenu.message("clear");

  // Factory
  if (chordSource == 0) {
    chordsArr.forEach(function(chordObj) {
      storedChordUmenu.message("append", chordObj.name);
    });
  }

  // User
  if (chordSource == 1) {
    var userChords = read("userChords.json") || [];
    userChords.forEach(function(chordObj) {
      storedChordUmenu.message("append", chordObj.name);
    });
  }
}