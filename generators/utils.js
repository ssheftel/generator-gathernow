var fs = require('fs');
function insertBeforeLine(filePath, searchLine, insertString) {
  var file, insertPointIndex, insertString;
  file = fs.readFileSync(filePath, {encoding: 'utf8'});
  insertPointIndex = file.indexOf(searchLine);
  insertString = '  ' + insertString + '\n' + searchLine;
  if (insertPointIndex !== -1) {
    fs.writeFileSync(filePath, file.replace(searchLine, insertString), {encoding: 'utf8'});
    //this.write(filePath, file.replace(searchLine, insertString));
  }
}

function makeScriptTag(path) {
  return '<script src="' + path  +'"></script>'
}

module.exports = {
  insertBeforeLine: insertBeforeLine,
  makeScriptTag: makeScriptTag
}
