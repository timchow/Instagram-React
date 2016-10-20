var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');

gulp.task('build', function () {
    return browserify({entries: './src/js/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build'));
});
 
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
    .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./src/js/*.js', ['build']);
    gulp.watch('./src/less/*.less', ['less']);
});

gulp.task('default', ['build','less','watch']);