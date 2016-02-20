// lets begin!
var gulp = require('gulp');

gulp.task('copy', function () {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('out/'));
});
