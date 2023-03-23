inlets = 4;
outlets = 1;

if (jsarguments.length > 1) output = jsarguments[1];

var keyboardSize = 88;
var tabKeyboardSize = this.patcher.getnamed("tabKeyboardSize");

var rootNote = 21;
var numboxOffset = this.patcher.getnamed("numboxOffset");

// var commentWhiteKeyLabels = this.patcher.getnamed("commentWhiteKeyLabels");
// var commentBlackKeyLabels = this.patcher.getnamed("commentBlackKeyLabels");

var keyboards = [
  {
    offset: 36,
    size: 25,
  },
  {
    offset: 36,
    size: 37,
  },
  {
    offset: 36,
    size: 49,
  },
  {
    offset: 36,
    size: 61,
  },
  {
    offset: 21,
    size: 88,
  },
];

var noteNames = [
  "C",
  ["C#", "D♭"],
  "D",
  ["D#", "E♭"],
  "E",
  "F",
  ["F#", "G♭"],
  "G",
  ["G#", "A♭"],
  "A",
  ["A#", "B♭"],
  "B",
];

function parseNoteName(noteInt) {
  var noteName = "";
  var octaveInt = Math.floor(noteInt / 12);

  switch (noteInt % 12) {
    case 0:
      noteName = noteNames[0];
      break;
    case 1:
      noteName = noteNames[1][1];
      break;
    case 2:
      noteName = noteNames[2];
      break;
    case 3:
      noteName = noteNames[3][1];
      break;
    case 4:
      noteName = noteNames[4];
      break;
    case 5:
      noteName = noteNames[5];
      break;
    case 6:
      noteName = noteNames[6][1];
      break;
    case 7:
      noteName = noteNames[7];
      break;
    case 8:
      noteName = noteNames[8][1];
      break;
    case 9:
      noteName = noteNames[9];
      break;
    case 10:
      noteName = noteNames[10][1];
      break;
    case 11:
      noteName = noteNames[11];
      break;
  }

  return noteName + octaveInt;
}

function msg_int(v) {
  // set keyboard size, reset offset
  if (inlet == 1) {
    keyboardSize = keyboards[v]["size"];
    rootNote = keyboards[v]["offset"];
    numboxOffset.message("set", rootNote);
    numboxOffset.message("bang");
  }

  // set offset
  if (inlet == 2) {
    rootNote = v;
  }
}

function bang() {
}

// function outputKeyLabels() {
//   var whiteNoteNames = [];
//   var blackNoteNames = [];

//   for (var noteInt = rootNote; noteInt < 127; noteInt++) {
//     var noteName = parseNoteName(noteInt);
//     if (noteName.indexOf("♭") != -1) {
//       blackNoteNames.push(noteName);
//     } else {
//       whiteNoteNames.push(noteName);
//     }
//   }

//   commentWhiteKeyLabels.message("set", whiteNoteNames);
//   commentBlackKeyLabels.message("set", blackNoteNames);
// }
