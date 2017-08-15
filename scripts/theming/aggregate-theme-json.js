/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

require('shelljs/global');
const fs = require('fs');
const postcss = require('postcss');
const scss = require('postcss-scss');
const themingPlugin = require('./generate-theme-json-plugin');
const chalk = require('chalk');
const path = require('path');
const concat = require('concat-files');


const files = [];

cd('./packages');
ls().forEach(function (folder) {
  // echo(chalk.cyan(`Compiling ${folder}...`));

  cd(folder);
  if (test('-d', 'src')) {
    cd('src');
    if (test('-d', 'themes')) {
      cd('themes');
      ls().forEach(function (file) {
        const fileExt = file.split('.');
        if (fileExt[1] === 'css') {
          files.push(path.resolve(file));
        }
      });
      cd('../');
    }
    cd('../');
  }
  cd('../');
});


// Generates all theme types
const allThemesTypes = [];
files.forEach(function (value) {
  const fileName = value.substring(value.lastIndexOf('/') + 1, value.lastIndexOf('.'));
  allThemesTypes.push(fileName);
});

// Generate unique theme types
const uniqueThemeTypes = allThemesTypes.filter(function (value, index, self) {
  return self.indexOf(value) === index;
});

const themes = {};
uniqueThemeTypes.forEach(function (elem) {
  themes[elem] = files.filter(function (value) {
    return value.includes(elem);
  });
});

console.log(themes);

concat(themes['light-theme'], '/Users/bj031910/repos/terra-core/packages/terra-site/src/themes/master-light-theme.css', function(err) {
  if (err) throw err
  console.log('done');
});
