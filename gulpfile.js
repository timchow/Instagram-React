// Defining packages
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify'); // Speeds up transpiling process by caching a version and diff-ing
var reactify = require('reactify'); // JSX -> JS
var streamify = require('gulp-streamify');

var path = {
	HTML: 'index.html',
	MINIFIED_OUT: 'app.min.js',
	OUT: 'app.js',
	DEST: 'build',
	DEST_SRC: 'src',
	ENTRY_POINT: './src/index.js'
};

// Copying index.html from src to dist so it can reference the transformed JS
gulp.task('copy', function() {
    gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
    gulp.watch(path.HTML, ['copy']);

    var watcher = watchify(browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    // watcher.bundle will concat all the files into one file
    return watcher.on('update', function() {
        watcher.bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST))
        console.log('Updated');
    }).bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST));
});

// Dev task
gulp.task('default', ['watch']);