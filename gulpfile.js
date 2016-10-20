var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: './src/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {
    gulp.watch('./src/*.js', ['build']);
});

gulp.task('default', ['build','watch']);