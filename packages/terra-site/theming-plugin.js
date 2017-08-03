const postcss = require('postcss');
const fs = require('fs');

/**
 * Extract all variables used in PostCSS files.
 * Detect custom properties and SASS like variables.
 *
 * options  {object}
 *   file:  {string}       File name with path
 *   type:  {string}       File type. JSON and JS are supported. JSON ist default.
 *   match: {string array} String array property name should contain
 *
 * @type {Plugin<T>}
 */
module.exports = postcss.plugin('theming-plugin', () => {
  const variables = {};

  /**
   * Plugin return
   *
   * @returns {function}
   */
  return function getThemedVariables(root) {
    let component = (root.source && root.source.input && root.source.input.file) || 'miscellaneous';
    component = component.substr(component.lastIndexOf('/') + 1, component.lastIndexOf('.scss') - component.lastIndexOf('/') - 1);

    root.walkDecls((decl) => {
      const matches = decl.value.match(/^var\((.*),\s*(.*)\)/);

      if (matches) {
        variables[component] = variables[component] || {};
        variables[component][matches[1]] = matches[2];
      }
    });

    return fs.writeFileSync('themeable-variables.json', JSON.stringify(variables), 'utf8');
  };
});
