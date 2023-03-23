inlets = 1;
outlets = 1;

var notes = [];

function msg_int(v) {
  var existingNoteIndex = null;
  var existingNote = notes.filter(function(noteObj, index) {
    if (noteObj.note == v) existingNoteIndex = index;
    return noteObj.note == v;
  });

  if (existingNote[0] && existingNote[0].status == "remove") { // remove it
    var filteredNotes = notes.filter(function(noteObj) {
      return noteObj.note != v;
    });
    notes = filteredNotes;
  } else if (existingNote[0] && existingNote[0].status == "off") { // mark for removal
    notes[existingNoteIndex].status = "remove";
  } else if (existingNote[0] && existingNote[0].status == "on") { // turn it off
    notes[existingNoteIndex].status = "off";
  } else { // add it
    notes.push({note: v, status: "on"})
  }

  post(JSON.stringify(notes) + "\n")
  output();
}

function output() {
  var notesWithVelo = [];
  var onNoteInts = notes.filter(function(noteObj) {
    return noteObj.status == "on" || noteObj.status == "off"
  }).map(function(noteObj) {
    return noteObj.note;
  })
  onNoteInts.forEach(function (note) {
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
