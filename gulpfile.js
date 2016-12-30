'use strict'
let gulp = require('gulp')
let uglify = require('gulp-uglify')

gulp.task('jsmin', function () {
  gulp.src(['./dist/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
