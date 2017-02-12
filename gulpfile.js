var gulp = require('gulp');
var webserver = require('gulp-webserver');
var tojst = require('gulp-tojst');
var path = require('path');
var qunit = require('gulp-qunit');
var minify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

var CLIENT_SCRIPTS = [
    'assets/js/init-application.js',
    'build/jst.js',
    'assets/js/models/Main.js',
    'assets/js/views/Tab.js',
    'assets/js/views/Category.js',
    'assets/js/views/Main.js',
    'assets/js/routers/Router.js',
    'assets/js/run.js'
];

var VENDORS = [
    'vendors/js/jquery.js',
    'vendors/js/underscore.js',
    'vendors/js/backbone.js'
];

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

gulp.task('test', function () {
    return gulp.src('./tests/test-runner.html')
        .pipe(qunit());
});

gulp.task('js-for-tests', function () {
    return gulp.src(CLIENT_SCRIPTS).pipe(concat('builded-for-tests.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('css-min', function () {
    gulp.src([
        'assets/css/reset.css',
        'assets/css/styles.css'
    ]).pipe(concat('builded.css'))
    .pipe(cssmin())
        .pipe(gulp.dest('build'));
});

gulp.task('vendor', function () {
    gulp.src(VENDORS)
        .pipe(concat('vendors.js'))
        .pipe(minify())
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['js-for-tests', 'test', 'css-min', 'vendor', 'jst', 'webserver'], function () {
    gulp.src(CLIENT_SCRIPTS)
        .pipe(concat('client.js'))
        .pipe(minify())
        .pipe(gulp.dest('build'));
});