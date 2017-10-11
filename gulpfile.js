var gulp = require('gulp');
var jsonImporter = require('node-sass-json-importer');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var fs = require('fs');

// Icons

var buildSVGs = require('./build/buildSVGs');

gulp.task('icons', ['styles'], function() {
  return gulp.src('icons.json')
    .pipe(buildSVGs())
    .pipe(gulp.dest('icons'));
});

// Styles

var files = [
  'styles/uptown.scss'
];

gulp.task('styles', function() {
  return gulp.src(files)
    .pipe(sass({importer: jsonImporter}).on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('css'));
});


// Version-specific css
gulp.task('release', function() {
  var json = JSON.parse(fs.readFileSync('./package.json'));

  gulp.src('css/uptown.css')
    .pipe(rename('uptown-' + json.version + '.css'))
    .pipe(gulp.dest('css'));
});



gulp.task('default', ['styles']);