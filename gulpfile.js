// lets begin!
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var through = require('through2');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('default', ['build']);

gulp.task('build', ['build:copy', 'build:scss', 'build:scripts']);
gulp.task('build:scss', compileScssTask);
gulp.task('build:copy', copyTask);
gulp.task('build:scripts', buildScriptsTask);

// See https://www.npmjs.com/package/gulp-sequence
// to make this sequential
gulp.task('watch', ['build', 'watch:scss', 'watch:copy', 'watch:scripts']);
gulp.task('watch:scss', watchScssTask);
gulp.task('watch:scripts', watchScriptsTask);
gulp.task('watch:copy', watchCopyTask);

gulp.task('dev', ['watch'], setupBrowserSyncTask);

gulp.task('clean', cleanTask);

function buildScriptsTask() {
  return browserify('src/scripts/main.js', {
    debug : true
  })
    .bundle()
    .on('error', function (err) {
      gutil.log('error occurred in pipeline:', err);
      this.push(null);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('out/'))
    .pipe(browserSync.stream());
}

function setupBrowserSyncTask() {
  browserSync({
    server : {
      baseDir : 'out'
    },
    open : false
  });
}

function watchScssTask() {
  gulp.watch('src/styles/*.scss', {}, ['build:scss']);
}
function watchCopyTask() {
  gulp.watch('src/assets/**', {}, ['build:copy']);
}
function watchScriptsTask() {
  gulp.watch('src/scripts/**', {}, ['build:scripts']);
}

function compileScssTask() {
  return gulp.src('src/styles/*.scss')
    .pipe(plumber(function (err) {
      gutil.log('error occurred in pipeline:', err);
      this.push(null);
    }))
    .pipe(inspect())
    .pipe(sass())
    .pipe(gulp.dest('out/'))
    .pipe(browserSync.stream());
}

function copyTask() {
  return gulp.src('src/assets/**')
    .pipe(gulp.dest('out/'))
    .pipe(browserSync.stream());
}

function cleanTask() {
  return del('out/');
}

function inspect() {
  return through.obj(function (file, _, callback) {
    gutil.log('looking at file:', file);
    //this.emit('error', new Error('something broke!'));
    this.push(file);
    callback();
  });
}