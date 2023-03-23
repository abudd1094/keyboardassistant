// scale integer, root note, mode
inlets = 3;
// scale int notation, quantize scale name string, scale information text, to scoreLogic.js, root note name out
outlets = 5;

var { scalesArr } = require("scales"); 
var { parseNoteName } = require("utilities");
var { primaryMenuParams } = require("umenuLogic.js");

var storedScaleUmenu;

// initialize to off
var selectedScaleObj = scalesArr[0];
// initialize root to C
var rootNote = 0;
// adjust scale to root
var rootedIntNotation = adjustIntNotationToRoot();
// initialize octaves to 8
var octaveLimit = 11;
var mode = 0;

if (jsarguments.length > 1) output = jsarguments[1];

// Reception Functions
function msg_int(v) {
  // set scale
  if (inlet == 0) {
    selectedScaleObj = scalesArr[v];
    rootedIntNotation = adjustIntNotationToRoot();
  }

  // set root note
  if (inlet == 1) {
    rootNote = v;
    rootedIntNotation = adjustIntNotationToRoot();
  }

  // set mode
  if (inlet == 2) {
    mode = v;
  }

  bang();
}

function bang() {
  if (mode == 1) {
    outputSelectedScale();
  }
}

function adjustIntNotationToRoot() {
  return selectedScaleObj.intNotation
    .map(function (int) {
      var adjustedNote = rootNote + int;

      if (adjustedNote > 11) {
        return adjustedNote - 12;
      } else {
        return adjustedNote;
      }
    })
    .sort(function (a, b) {
      return a - b;
    });
}

function outputSelectedScale() {
  var rootedIntNotationWithVelocities = [];
  var rootNoteName = parseNoteName(rootNote);
  var noteOffset = 0;

  // iterate through octaves
  for (var i = 0; i < octaveLimit; i++) {
    for (var j = 0; j < rootedIntNotation.length; j++) {
      rootedIntNotationWithVelocities.push(rootedIntNotation[j] + noteOffset);
      rootedIntNotationWithVelocities.push(127);
    }
    noteOffset += 12;
  }
  noteOffset = 0;

  outlet(0, rootedIntNotationWithVelocities);
  outlet(1, selectedScaleObj.name);
  outlet(2, selectedScaleObj.info);
  outlet(3, "initializeMiniScore");
  outlet(3, "outputKeySignature", rootNote, rootedIntNotation);
  outlet(3, "outputScaleNotes", rootNote, rootedIntNotation);
  outlet(4, "set", rootNoteName, selectedScaleObj.name)
}

// Patcher Functions
function renderUmenu() {
  if (!storedScaleUmenu) {
    var scaleUmenu = this.patcher.newdefault(primaryMenuParams(112, 212));
    storedScaleUmenu = scaleUmenu;
    var scaleDial = this.patcher.getnamed("dial_scale");

    this.patcher.connect(scaleDial,0,scaleUmenu,0);
    this.patcher.connect(scaleUmenu,0,scaleDial,0);

    scalesArr.forEach(function(scaleObj) {
      scaleUmenu.message("append", scaleObj.name)
    });
  } else {
    error("umenu already exists! \n")
  }
  bang();
}

function removeUmenu() {
  if (storedScaleUmenu) {
    this.patcher.remove(storedScaleUmenu);
    storedScaleUmenu = null;
  }
  bang();
}