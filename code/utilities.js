exports.parseNoteName = function (noteInt, octaveInt) {
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

  var noteName = "";

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

  if (octaveInt) {
      return noteName + octaveInt;
  } else {
    return noteName;
  }
}