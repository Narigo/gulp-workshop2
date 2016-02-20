// lets begin!
var gulp = require('gulp');
var del = require('del');

gulp.task('default', ['copy']);

gulp.task('copy', copyTask);

gulp.task('clean', cleanTask);


function copyTask() {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('out/'));
}

function cleanTask() {
  return del('out/');
}
