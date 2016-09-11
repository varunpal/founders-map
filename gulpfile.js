var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  less = require('gulp-less');

var JS_DEST = 'dist/scripts',
  CSS_DEST = 'dist/styles';

gulp.task('scripts', function() {  
  return gulp.src(['assets/scripts/utils.js',
      'assets/scripts/startup-table.js',
      'assets/scripts/map.js',
      'assets/scripts/foundry.js',
      'assets/scripts/index.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(JS_DEST))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(JS_DEST));
});

gulp.task('styles', function () {
  return gulp.src('./assets/styles/main.less')
    .pipe(less({
      paths: ['./assets/styles'],
      compress: true
    }))
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('default', ['scripts', 'styles']);