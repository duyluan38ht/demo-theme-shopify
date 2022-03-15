const gulp = require( 'gulp' );
const sass = require('gulp-sass')(require('node-sass'));
const watch = require('gulp');
const rename = require( 'gulp-rename' );
const uglify = require( 'gulp-uglify-es' ).default;
const lineec = require( 'gulp-line-ending-corrector' );
const zip = require( 'gulp-vinyl-zip' );
const del = require( 'del' );
const cssmin = require('gulp-cssmin');

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )

        .pipe(gulp.dest('assets'));
});
gulp.task('sassdefault', function () {
    return gulp.src('src/sass/defaults/*.scss')
        .pipe(sass())
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe(gulp.dest('assets'));
});
gulp.task('csstomin', function () {
    return gulp.src('src/sass/defaults/*.css')
        .pipe(cssmin())
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe(gulp.dest('assets'));
});

gulp.task('sasstomin', function () {
    return gulp.src('src/sass/defaults/*.scss')
        .pipe(cssmin())
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe(gulp.dest('assets'));
});
const releasesFiles = [
    './**',
    '!node_modules/**',
    '!releases/**',
    '!Gulpfile.js',
    '!LICENSE',
    '!README.md',
    '!shopifyignore',
    '!package.json',
    '!package-lock.json',
    '!src/**'
];

gulp.task( 'minJsFrontend', () => {
    return gulp
        .src( [ 'src/js/*.js' ] )
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe( uglify() )
        .pipe( lineec() )
        .pipe( gulp.dest( 'assets' ) );
} );

gulp.task('watch', gulp.series(function(){
    gulp.watch('src/sass/*.scss',gulp.parallel( 'sass' ));
    gulp.watch('src/sass/*/*.scss',gulp.parallel( 'sass' ));
    gulp.watch('src/sass/*/*.scss',gulp.parallel( 'sassdefault' ));
    gulp.watch('src/sass/defaults/*.css',gulp.parallel( 'csstomin' ));
    gulp.watch('src/js/*.js',gulp.parallel( 'minJsFrontend' ));
}));

// Clean folder to releases.
gulp.task( 'cleanReleases', () => {
    return del( './releases/**' );
} );

// Copy folder to releases.
gulp.task( 'copyReleases', () => {
    return gulp.src( releasesFiles ).pipe( gulp.dest( './releases/sale-master/' ) );
} );

// Zip learnpress in releases.
gulp.task( 'zipReleases', () => {
    return gulp
        .src( './releases/sale-master/**', { base: './releases/' } )
        .pipe( zip.dest( './releases/sale-master.zip' ) );
} );

gulp.task(
    'packaging',
    gulp.series(
        'cleanReleases',
        'copyReleases',
        'zipReleases',
        ( done ) => {
            done();
        }
    )
);
gulp.task(
    'run',
    gulp.series(
        'sass',
        'sassdefault',
        'csstomin',
        'minJsFrontend',
        ( done ) => {
            done();
        }
    )
);
// library
gulp.task('lib_csstomin', function () {
    return gulp.src('src/lib/css/*.css')
        .pipe(cssmin())
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe(gulp.dest('assets'));
});
gulp.task( 'lib_minJsFrontend', () => {
    return gulp
        .src( [ 'src/lib/js/*.js' ] )
        .pipe(
            rename( {
                suffix: '.min',
            } )
        )
        .pipe( uglify() )
        .pipe( lineec() )
        .pipe( gulp.dest( 'assets' ) );
} );
gulp.task(
    'lib',
    gulp.series(
        'lib_csstomin',
        'lib_minJsFrontend',
        ( done ) => {
            done();
        }
    )
);




