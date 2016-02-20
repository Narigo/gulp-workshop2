// lets begin!
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var through = require('through2');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('build', ['copy', 'scss']);
gulp.task('scss', compileScssTask);
gulp.task('copy', copyTask);

gulp.task('watch', ['build'], watchTask);

gulp.task('clean', cleanTask);

function watchTask() {
  gulp.watch('src/styles/*.scss', {}, ['scss']);
  gulp.watch('src/assets/**', {}, ['copy']);
}

function compileScssTask() {
  return gulp.src('src/styles/*.scss')
    .pipe(inspect())
    .pipe(sass())
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