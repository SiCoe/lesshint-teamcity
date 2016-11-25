lesshint-teamcity
=================

[![NPM version](https://img.shields.io/npm/v/lesshint-teamcity.svg)](https://www.npmjs.com/package/lesshint-teamcity)
[![MIT License](https://img.shields.io/github/license/SiCoe/lesshint-teamcity.svg)](https://github.com/SiCoe/lesshint-teamcity/blob/master/LICENSE)
[![Dependency Status](https://img.shields.io/david/SiCoe/lesshint-teamcity.svg)](https://david-dm.org/SiCoe/lesshint-teamcity)
[![devDependency Status](https://img.shields.io/david/dev/SiCoe/lesshint-teamcity.svg)](https://david-dm.org/SiCoe/lesshint-teamcity?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/SiCoe/lesshint-teamcity.svg)](https://github.com/SiCoe/lesshint-teamcity/issues)

TeamCity reporter for [lesshint](https://github.com/lesshint/lesshint) errors.

## Install

```shell
npm install --save-dev lesshint-teamcity
```

## Usage

Use the [gulp-lesshint](https://www.npmjs.com/package/gulp-lesshint) module
for [gulp](https://www.npmjs.com/package/gulp) to pipe in files to be analysed.

When run in [TeamCity](https://www.jetbrains.com/teamcity/) the errors will
show as failed test results and can therefore fail the build. 

```js
var gulp = require('gulp');
var lesshint = require('gulp-lesshint');

gulp.task('default', function () {
    gulp.src(['**/*.html'])
        .pipe(lesshint())
        .pipe(htmlhint.reporter('lesshint-teamcity'));
```

Errors are grouped by file and then by [lesshint linter](https://github.com/lesshint/lesshint/blob/master/lib/linters/README.md)
when displayed in TeamCity *Build Log* or *Tests* tab.
