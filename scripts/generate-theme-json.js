/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

require('shelljs/global');
const fs = require('fs');
const postcss = require('postcss');
const scss = require('postcss-scss');
const themingPlugin = require('./postcss-theme-plugin');

const chalk = require('chalk');
// const variables = {};

cd('./packages');
ls().forEach(function (folder) {
  echo(chalk.cyan(`Compiling ${folder}...`));

  cd(folder);
  cd('src');

  ls().forEach(function (file) {
    const scssFile = file.slice(-4);

    if (scssFile === 'scss') {
      echo(chalk.red(`File: ${file}`));

      fs.readFile(file, (err, css) => {
        postcss([themingPlugin]).process(css, { parser: scss }).then((result) => {
           // console.log(result.css);
        });
      });
    }
  });

  echo(chalk.green(`Finished compiling ${folder}`));
  echo('');

  cd('../../');
});
