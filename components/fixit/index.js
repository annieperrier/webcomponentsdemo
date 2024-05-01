'use strict';

// set and use a prefix for different components
let logPrefix = '';

// log a message with a prefix and possible additional data
function log(prefix, message, ...data) {
  console.log(prefix + ':', message, data.length ? data : '');
}

///
// FixIt
logPrefix = 'FixIt';
log(logPrefix, 'Start');

// get the known first fixit
let fixit1 = document.querySelector('fix-it');
log(logPrefix, 'First Element: ');
log(logPrefix, 'Element ID: ' + fixit1.id);
log(logPrefix, 'Current fixCount: ' + fixit1.fixCount);

// process the list of all fixits
let allfixits = document.querySelectorAll('fix-it');
log(logPrefix, 'All Elements: ');
allfixits.forEach((value, key) => {
  log(logPrefix, 'Element #' + key);
  log(logPrefix, "Element ID: " + value.id)
  log(logPrefix, "Current fixCount: " + value.fixCount);
});
log(logPrefix, 'End');

function fixitGetCurrentFixedCount(elementIndex) {
  let allfixits = document.querySelectorAll('fix-it');
  if (elementIndex == null || elementIndex >= allfixits.length)
    return;
  let fixCount = allfixits[elementIndex].fixCount;
  alert(logPrefix + ' fixCount for element #' + (elementIndex + 1) + ': ' + fixCount);
}

function fixitSetMode(elementIndex, mode) {
  let allfixits = document.querySelectorAll('fix-it');
  if (elementIndex == null || elementIndex >= allfixits.length)
    return;
  allfixits[elementIndex].setAttribute('mode', mode);
}

///

