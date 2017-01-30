var gulp = require('gulp');
var webserver = require('gulp-webserver');
var template = require('gulp-template-compile');
var tojst = require('gulp-tojst');
var path = require('path');
var minify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('jst', function () {
    gulp.src('./assets/templates/*.html')
        .pipe(tojst('jst.js', {
            separator: '\n',
            prettify: true,
            namespace: 'app.JST',
            processName: function (fullPath) {
                return path.basename(fullPath, '.html');
            }
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            directoryListing: true,
            livereload: true,
            open: true
        }));
});


gulp.task('min', ['jst'], function () {
    gulp.src([
        'assets/js/init-application.js',
        'build/jst.js',
        'assets/js/models/Main.js',
        'assets/js/views/Tab.js',
        'assets/js/views/Category.js',
        'assets/js/views/Main.js',
        'assets/js/routers/Router.js',
        'assets/js/run.js'
    ])
        .pipe(concat('builded.js'))
        .pipe(minify())
        .pipe(gulp.dest('build'));
});