var gulp = require('gulp');
var nested = require('postcss-nested');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var authoprefix = require('gulp-autoprefixer');


gulp.task('styling' , function(){
  var processors = [nested , require('autoprefixer')];
  gulp.src('./src/**/*.scss')
    .pipe(postcss(processors, {syntax: scss}))
    .pipe(gulp.dest('./src'));
});
