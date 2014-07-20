var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');

gulp.task('styles', function() {
    gulp.src('style/**')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('static/css/'));
});

var vendorCSS = [
    "bower_components/semantic/build/packaged/css/semantic.min.css",
];

var vendorScripts = [
    "bower_components/jquery/dist/jquery.min.js",
    "bower_components/underscore/underscore.js",
    "bower_components/backbone/backbone.js",
    "bower_components/handlebars/handlebars.min.js",
    "bower_components/semantic/build/packaged/javascript/semantic.min.js",
];

gulp.task('concatCSS', function() {
    gulp.src(vendorCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('static/css/'));
});

gulp.task('concatJS', function() {
    gulp.src(vendorScripts)
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('static/js/'));
    gulp.src('static/js/app.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static/js/'));
});

gulp.task('develop', function() {
    process.env.NODE_ENV = 'dev';
    nodemon({
        script: 'server.js',
        ext: 'jade less js',
        ignore: ['node_modules/', 'test/']
    })
        .on('change', ['styles'])
        .on('restart', function() {
            console.log('restarted');
        });
});

gulp.task('default', ['styles', 'concatCSS', 'concatJS']);
