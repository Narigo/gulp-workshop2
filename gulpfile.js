// lets begin!
var gulp = require('gulp');
var del = require('del');

gulp.task('copy', function () {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('out/'));
});

gulp.task('clean', function () {
  return del('out/');
});
