// inlet 0 = intNotation
inlets = 1;
outlets = 1;

var { chordsArr } = require("chords"); 
var { scalesArr } = require("scales");
var { parseNoteName } = require("utilities");
var { editMenuParams } = require("umenuLogic");
var { read, write } = require("filesystem");

var basePath = "/Users/abudd/Documents/Max 8/Max for Live Devices/Keyboard-Assistant Project/data";

var storedScaleUmenu;
var storedChordUmenu;

var notes = [];
var objectName = "";
var info = "";

function msg_int(v) {
  if (notes.indexOf(v) == -1) {
    notes.push(v);
  } else {
    notes = notes.filter(function (note) {
      return note != v;
    });
  }

  bang();
}

function bang() {
  var noteNames = parseNotesNames();
  outlet(0, "set", noteNames);
}

// set name
function text() {
  var a = arrayfromargs(arguments);
  var newName = a.join(" ");
  objectName = newName;
}

// clear notes and name
function clear() {
  var kslider_scaleinput = this.patcher.getnamed("kslider_scaleinput");
  var textinput_editname = this.patcher.getnamed("textinput_editname");
  kslider_scaleinput.message("clear");
  textinput_editname.message("clear");

  notes = [];
  objectName = "";
  outlet(0, "set");
}

// save chord to chords.js
function saveChord() {
  var chordObj = {
    name: objectName,
    intNotation: notes,
    info: info,
    source: "user"
  }

  saveChordToFile(chordObj);
  storedChordUmenu.message("append", objectName)

  post(JSON.stringify(chordsArr) + "\n")
}

function deleteChord() {
  var a = arrayfromargs(arguments);
  var chordName = a.join(" ");
  removeChordFromFile(chordName);
  repopulateStoredChordUmenu();
}

function parseNotesNames() {
  return notes.map(function(note) {
    return parseNoteName(note)
  })
}

// umenu Functions
function renderUmenus() {
  if (!storedScaleUmenu) {
    var scaleUmenu = this.patcher.newdefault(editMenuParams(868.319444, 249.291664, 1));  
    storedScaleUmenu = scaleUmenu;
    var prependDeleteScale = this.patcher.getnamed("prepend_deleteScale");

    this.patcher.connect(scaleUmenu,1,prependDeleteScale,0);

    scalesArr.forEach(function(scaleObj) {
      scaleUmenu.message("append", scaleObj.name)
    });
  } else {
    error("umenu already exists! \n")
  }

  if (!storedChordUmenu) {
    var chordUmenu = this.patcher.newdefault(editMenuParams(993.319444, 249.291664, 2));
    storedChordUmenu = chordUmenu;
    var prependDeleteChord = this.patcher.getnamed("prepend_deleteChord");

    this.patcher.connect(chordUmenu,1,prependDeleteChord,0);

    chordsArr.forEach(function(chordObj) {
      chordUmenu.message("append", chordObj.name)
    });
  } else {
    error("chord umenu already exists! \n")
  }

  bang();
}

function removeUmenus() {
  if (storedScaleUmenu) {
    this.patcher.remove(storedScaleUmenu);
    storedScaleUmenu = null;
  }

  if (storedChordUmenu) {
    this.patcher.remove(storedChordUmenu);
    storedChordUmenu = null;
  }

  bang();
}

function repopulateStoredChordUmenu() {
  storedChordUmenu.message("clear");
  chordsArr.forEach(function(chordObj) {
    storedChordUmenu.message("append", chordObj.name);
  });
}

// File System Functions
function saveChordToFile(chordObj) {
  var storageLocation = basePath + "/userChords.json";
  var userChords = read("userChords.json") || [];
  var chordAlreadyExists = userChords.filter(function (existingChordObj) {
    return existingChordObj.name == chordObj.name;
  }).length > 0;

  if (chordAlreadyExists) {
    error("Chord already exists!");
  } else {
    userChords.push(chordObj);
    write(storageLocation, userChords);
  }
}

function removeChordFromFile(chordName) {
  var storageLocation = basePath + "/userChords.json";
  var userChords = read("userChords.json") || [];
  var filteredUserChords = userChords.filter(function (existingChordObj) {
    return existingChordObj.name != chordName;
  });
  write(storageLocation, filteredUserChords);
}