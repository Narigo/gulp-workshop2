// lets begin!
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('build', ['copy', 'scss']);
gulp.task('scss', compileScssTask);
gulp.task('copy', copyTask);

gulp.task('clean', cleanTask);

function compileScssTask() {
  return gulp.src('src/styles/app.scss')
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
