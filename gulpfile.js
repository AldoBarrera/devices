'use strict';

let gulp = require('gulp');

var exec = require('child_process').exec;

gulp.task('clientscripts', function (cb) {
  exec('cd public && ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('npmclient', function (cb) {
  exec('cd public && npm install', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// This task can be run alone with "gulp serverscripts"

gulp.task('serverscripts', function (cb) {
  exec('cd server && gulp default', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


gulp.task('npmserver', function (cb) {
  exec('cd server && npm install', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('npmapp', function (cb) {
  exec('npm install', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
  gulp.watch('public/src/**/*.ts', [ 'clientscripts' ]);
  gulp.watch('server/src/**/*.ts', [ 'serverscripts' ]);
});

gulp.task('build',
  gulp.series('npmapp', 'npmserver', 'npmclient', 'serverscripts', 'clientscripts'));
