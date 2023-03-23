inlets = 1;
outlets = 1;

var notes = [];

function msg_int(v) {
  if (notes.indexOf(v) == -1) {
    notes.push(v);
  } else {
    notes = notes.filter(function (note) {
      return note != v;
    });
  }

  output();
}

function output() {
  var notesWithVelo = [];
  notes.forEach(function (note) {
    notesWithVelo.push(note);
    // default velo = 127
    notesWithVelo.push(127);
  });

  if (notesWithVelo.length > 0) {
    outlet(0, "chord", notesWithVelo);
  } else {
    outlet(0, "flush");
  }
}
