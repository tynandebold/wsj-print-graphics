// include gulp
var gulp = require('gulp');

// include plugins
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var del = require('del');

// specific tasks
gulp.task('default', ['compass', 'watch', 'webserver']);
gulp.task('build', ['move', 'cleanCSS', 'compressJS']);

// config scss/css with compass
gulp.task('compass', function() {
  return gulp.src('app/scss/*.scss').pipe(
    compass({
      config_file: 'config.rb',
      css: 'app/css',
      sass: 'app/scss'
    })
  );
});

// compile scss
gulp.task('sass', function() {
  return gulp
    .src('app/scss/*.scss')
    .pipe(sass({ compass: true }))
    .pipe(gulp.dest('app/css'));
});

// clean css
gulp.task('cleanCSS', function() {
  del('docs/css/*');
  return gulp
    .src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('docs/css'));
});

// uglify JS
gulp.task('compressJS', function() {
  del('docs/js/*');
  return gulp
    .src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'));
});

// watch files for changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/scss/*.scss', ['compass']);
});

// run a local server
gulp.task('webserver', function() {
  return gulp.src('app/').pipe(
    webserver({
      open: true
    })
  );
});

// move necessary files to build dir
gulp.task('move', function() {
  del('docs/**/*');
  return gulp
    .src(['app/*.html', 'app/*.ico'], { base: 'app' })
    .pipe(gulp.dest('docs'));
});
