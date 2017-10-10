var gulp = require('gulp');
var jsonImporter = require('node-sass-json-importer');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// Icons

var buildSVGs = require('./build/buildSVGs');

gulp.task('icons', ['styles'], function() {
  return gulp.src('icons.json')
    .pipe(buildSVGs())
    .pipe(gulp.dest('icons'));
});

// Styles

var files = [
  'styles/uptown.scss',
  'styles/uptown-edge.scss'
];

gulp.task('styles', function() {
  return gulp.src(files)
    .pipe(sass({importer: jsonImporter}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['styles']);