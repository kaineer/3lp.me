const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const sync = require('browser-sync').create();
const uglify = require('gulp-uglify');

// HTML

gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream());
});

// Styles

gulp.task('styles', () => {
    return gulp.src('src/blocks/styles.css')
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-csso')
        ]))
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream());
});

// Scripts

gulp.task('scripts', () => {
    return gulp.src('src/blocks/*/*.js')
        .pipe(concat('scripts.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream());
});

// Copy

gulp.task('copy', () => {
    return gulp.src([
            'src/feed/index.xml',
            'src/episodes/*',
            'src/images/*',
            'src/favicon.ico',
            'src/robots.txt'
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dest'))
        .pipe(sync.stream({
            once: true
        }));
});

// Server

gulp.task('server', () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dest'
        }
    });
});

// Watch

gulp.task('watch:html', () => {
    return gulp.watch(
        'src/*.html', gulp.series('html')
    );
});

gulp.task('watch:styles', () => {
    return gulp.watch(
        'src/blocks/*/*.css', gulp.series('styles')
    );
});

gulp.task('watch:scripts', () => {
    return gulp.watch(
        'src/blocks/*/*.js', gulp.series('scripts')
    );
});

gulp.task('watch:copy', () => {
    return gulp.watch([
        'src/images/*',
        'src/episodes/*'
    ], gulp.series('copy'));
});

gulp.task('watch', gulp.parallel(
    'watch:html',
    'watch:styles',
    'watch:scripts',
    'watch:copy'
));

// Build

gulp.task('build', gulp.parallel(
    'html',
    'styles',
    'scripts',
    'copy'
));

// Default

gulp.task('default', gulp.series(
    'build', gulp.parallel(
        'watch',
        'server'
    )
));
