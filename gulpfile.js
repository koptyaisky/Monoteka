let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefix = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');
let pug = require('gulp-pug');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let webpack = require('webpack');
let webpackStream = require('webpack-stream');
let browserSync = require('browser-sync');
let watch = require('gulp-watch');
let runSequence = require('run-sequence');



// gulp.task('serve', ['pug', 'sass', 'main-script', 'script'], function() {

//     browserSync.init({
//         server: "./"
//     });

//     gulp.watch('pug/**/*.pug',  ['pug']).on('change', browserSync.reload);
//     gulp.watch('scss/**/*.sass',  ['sass']).on('change', browserSync.reload);
//     gulp.watch('js/main.js', ['main-script']).on('change', browserSync.reload);
//     gulp.watch('js/form.js', ['script']).on('change', browserSync.reload);
//     gulp.watch("/*.html").on('change', browserSync.reload);
// });


/*
	css
*/
let files = ['!scss/consts.sass', '!scss/mix.sass', '!scss/reset.sass', '!scss/fonts.sass', 'scss/*.sass'];

gulp.task('sass', function () {
	gulp.src(files)
		.pipe(sass({errLogToConsole: true}))
        .pipe(autoprefix())
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('dist/'))
        /*
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/'))
		*/
});


/*
	html
*/
gulp.task('pug', function() {
    gulp.src('pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(''))
});

/*
	js
*/
gulp.task('main-script', function () {
  return gulp.src('./js/main.js')
    /*
    .pipe(webpackStream({
      output: {
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    */
    .pipe(gulp.dest('dist/'))
});

/*gulp.task('script', function () {
  return gulp.src('./js/custom.js')
    .pipe(webpackStream({
      output: {
        filename: 'custom.js',
      },
      module: {
        rules: [
          {
            test: /\.js/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'))
});*/

gulp.task('default', ['serve']);

gulp.task('watch', ['pug', 'sass', 'main-script'], function() {
    gulp.watch('pug/**/*.pug',  ['pug']);
    gulp.watch('scss/**/*.sass',  ['sass']);
    gulp.watch('js/main.js', ['main-script']);
    gulp.watch("/*.html");
});



// gulp.task('default', function(callback) {
//     runSequence(['pug', 'sass', 'scripts', 'watch'],
//         callback
//     )
// });



