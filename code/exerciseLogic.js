inlets = 1;
outlets = 1;

var { scalesArr } = require("scales");
var { chordsArr } = require("chords");

if (jsarguments.length > 1) output = jsarguments[1];

var currentExercise = null;
var currentStep = 0;

function msg_int(v) {
  if (inlet == 0) {
    post(v + "\n")
  }
}

function bang() {
  if (inlet == 0) {
    outlet(0, currentStep)
    currentStep++;
  }
}

function reset() {
  currentStep = 0;
}


