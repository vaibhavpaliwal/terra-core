/* eslint-disable */
var stylelint = require("stylelint");
var isCustomProperty = require("stylelint/lib/utils/isCustomProperty");

var ruleName = "terra/no-css-var-as-css-var";
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(value) {
    return "Do not set css custom properties as values in other css custom properties: " + value;
  }
});

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  if (!enabled) {
    return;
  }
  return function(root, result) {
    root.walkDecls(function(decl) {
      /**
       * Check to filter out non CSS custom properties
       */
      if (!isCustomProperty(decl.prop)) {
        return;
      }

      /**
       * Matches all instances of var(*), which is the syntax for CSS Variables
       * e.g. "color: var(--text-color);" matches "var(--text-color)"
       */
      var regexpPattern = /var\(([^)]+)\)/g;

      if (regexpPattern.test(decl.value)) {
        stylelint.utils.report({
            result,
            ruleName,
            message: messages.expected(decl.prop + ": " + decl.value),
            node: decl,
            word: decl.value
          });
      }
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
/* eslint-enable */
