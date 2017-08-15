const postcss = require('postcss');


module.exports = postcss.plugin('theming-plugin', (opts) => {
  const options = opts || {};

  if (typeof options.theme === 'undefined') {
    throw Error('No theme has been provided for the postcss theming plugin');
  }

  console.log(options.theme);

  return (root) => {
    root.walkDecls((decl) => {
      const matches = decl.value.match(/^var\((.*),\s*(.*)\)/);
      if (matches !== null) {
        // console.log(matches);
        Object.keys(options.theme).forEach((key) => {
          if (key === matches[1]) {
            // eslint-disable-next-line no-param-reassign
            decl.value = `var(${key}, ${options.theme[key]})`;
          }
        });
      }
    });
  };
});
