var primaryMenuParams = function (patcherXPos, patcherYPos) {
  return [patcherXPos, patcherYPos, "umenu", "@presentation", 1, "@presentation_rect", 44, 22.5, 100, 20];
}

var primaryMenuTabs = function (patcherXPos, patcherYPos) {
  return [patcherXPos, patcherYPos, "tab", "@tabs", "Factory", "User", "@presentation", 1, "@presentation_rect", 44, 1.5, 99, 19];
}

var editMenuParams = function (patcherXPos, patcherYPos, menuNo) {
  return [patcherXPos, patcherYPos, "umenu", "@presentation", 1, "@presentation_rect",  469, menuNo == 1 ? 20 : 47.75, 100, 20];
}

exports.primaryMenuParams = primaryMenuParams;
exports.primaryMenuTabs = primaryMenuTabs;
exports.editMenuParams = editMenuParams;