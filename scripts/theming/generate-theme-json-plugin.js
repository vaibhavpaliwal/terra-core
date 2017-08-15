const postcss = require('postcss');
const fs = require('fs');


module.exports = postcss.plugin('generate-theme-json-plugin', () => {
  return function getThemedVariables(root) {
    const path = (root.source && root.source.input && root.source.input.file) || 'miscellaneous';
    const component = path.substr(path.lastIndexOf('/') + 1, path.lastIndexOf('.css') - path.lastIndexOf('/') - 1);
    const directory = path.substr(0, path.lastIndexOf('/'));
    const variables = {};

    root.walkDecls((decl) => {
      const key = decl.prop;
      const value = decl.value;
      variables[key] = value;
    });

    return fs.writeFileSync(`${directory}/${component}.json`, JSON.stringify(variables), 'utf8');
  };
});
