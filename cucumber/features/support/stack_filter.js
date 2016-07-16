/*
 *	This code prevents excessive stack traces being displayed.
 *	See https://gist.github.com/jbpros/9975976
 */

/*
var path = require('path');
var filteredPathPrefix = path.resolve(__dirname, '..');
var originalPrepareStackTrace;
var stackTraceDepth = 1;
if (originalPrepareStackTrace = Error.prepareStackTrace) {
	Error.prepareStackTrace = function (error, stack) {
		var message = [error.name + ': ' + error.message];
		for (var i = 0; i < stack.length; i++ ) {
			if (stack[i].getFileName().indexOf(filteredPathPrefix) == 0) message.push('  at ' + stack[i]);
		}
		return message.slice(0, stackTraceDepth + 1).join('\n');
	};
}
*/

// features/support/stack_filter.js
module.exports = function () {
  var path = require('path');
  var filteredPathPrefix = path.resolve(__dirname, '..', '..');
  var originalPrepareStackTrace;

  if (originalPrepareStackTrace = Error.prepareStackTrace) {
    Error.prepareStackTrace = function (error, stack) {
      var originalString = originalPrepareStackTrace(error, stack);
      var string = 'Error: ' + error.message + "\n";
      var lines = originalString.replace('Error: ' + error.message + "\n", '').replace(/\s*$/, '').split("\n");
      var i;
      for (i = 0; i < lines.length; i++) {
        var line = lines[i];
        var callSite = stack[i];
        if (callSite.getFileName().indexOf(filteredPathPrefix) == 0)
          string = string + line + "\n";
      };
      return string;
    };
  }
};
