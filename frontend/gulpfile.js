'use strict';

// This gulp file automatically compiles the scss to css

const gulp      = require('gulp');
const sass      = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const uglify    = require('gulp-uglify');
const rename    = require('gulp-rename');
const changed   = require('gulp-changed');

const SCSS_SRC  = './src/assets/scss/**/*.scss';
const SCSS_DEST = './src/assets/css';

gulp.task('compile_scss', function() {
  gulp.src(SCSS_SRC)
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(changed(SCSS_DEST))
  .pipe(gulp.dest(SCSS_DEST))
});

gulp.task('watch_scss', function() {
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

gulp.task('default', ['watch_scss']);
