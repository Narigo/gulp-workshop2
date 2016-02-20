// lets begin!
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var through = require('through2');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('build', ['build:copy', 'build:scss']);
gulp.task('build:scss', compileScssTask);
gulp.task('build:copy', copyTask);

// See https://www.npmjs.com/package/gulp-sequence
// to make this sequential
gulp.task('watch', ['build', 'watch:scss', 'watch:copy']);
gulp.task('watch:scss', watchScssTask);
gulp.task('watch:copy', watchCopyTask);

gulp.task('clean', cleanTask);

function watchScssTask() {
  gulp.watch('src/styles/*.scss', {}, ['build:scss']);
}
function watchCopyTask() {
  gulp.watch('src/assets/**', {}, ['build:copy']);
}

function compileScssTask() {
  return gulp.src('src/styles/*.scss')
    .pipe(inspect())
    .pipe(sass())
    .on('error', function (err) {
      gutil.log('error occurred:', err);
      this.push(null);
    })
    .pipe(gulp.dest('out/'));
}

function copyTask() {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('out/'));
}

function cleanTask() {
  return del('out/');
}

function inspect() {
  return through.obj(function(file, _, callback) {
    gutil.log('looking at file:', file);
    this.push(file);
    callback();
  });
}