'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src(['./source/scss/bootstrap/bootstrap.scss','./source/scss/app.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      Browserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src(['./source/js/bootstrap/index.js', './source/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

// Minify images and cache them
gulp.task('images', function() {
  return gulp.src('./source/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('./source/scss/**/*.scss', gulp.task('sass'));
  gulp.watch('./source/js/**/*.js', gulp.task('js'));
  gulp.watch('./source/images/**/*.+(png|jpg|jpeg|gif|svg)', gulp.task('images'));
});


exports.default = gulp.parallel(gulp.task('sass'), gulp.task('js'), gulp.task('images'));