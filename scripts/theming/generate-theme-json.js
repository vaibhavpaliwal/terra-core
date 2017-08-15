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


cd('./packages');
ls().forEach(function (folder) {
  cd(folder);
  if (test('-d', 'src')) {
    cd('src');
    if (test('-d', 'themes')) {
      cd('themes');
      ls().forEach(function (file) {
        const fileExt = file.split('.');
        if (fileExt[1] === 'css') {
          const src = `${process.cwd()}/${file}`;
          echo(chalk.cyan(`Converting ${src} to JSON`));
          fs.readFile(src, (err, css) => {
            postcss([themingPlugin]).process(css, { from: src }, { parser: scss }).then(() => {});
          });
        }
      });
      cd('../');
    }
    cd('../');
  }
  cd('../');
});
