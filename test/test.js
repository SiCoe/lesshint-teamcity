var gulp = require('gulp'),
    util = require('gulp-util'),
    lesshint = require('gulp-lesshint'),
    assert = require('assert');

var oldOut = process.stdout.write;

it('should contain spaceAfterPropertyColon', function(done) {
    lesshintTest(function(consoleOutput) {
        assert(consoleOutput.includes("spaceAfterPropertyColon"));
        console.log(consoleOutput);
        done();
    });
});

function lesshintTest(test) {
    var out = '';

    process.stdout.write = function (str) {
        var oldWrite = process.stdout.write;
        out = out + str;
    };

    gulp
        .src(['test/test-input*.less'])
        .pipe(lesshint())
        .pipe(lesshint.reporter('.'))
        .on('finish', function (callback) {
            var stripped = util.colors.stripColor(out || '');
            process.stdout.write = oldOut;
            test(stripped);            
        });
}