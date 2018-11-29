var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var purgecss = require('gulp-purgecss');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();



gulp.task('tailwind', function () {
    return gulp.src('src/main.css')
    // ...
    .pipe(postcss([
      // ...
      tailwindcss('./tailwind.js'),
      autoprefixer({
        browsers:[
          'last 5 versions', 
          'Safari 8',
        ]}),
      // ...
    ]))
    // .pipe(purgecss({
    //   content: ["*.html"],
    //   extractors: [
    //       {
    //           extractor: class TailwindExtractor {
    //               static extract(content) {
    //                   return content.match(/[A-z0-9-:\/]+/g) || [];
    //               }
    //           },
    //           extensions: ['css', 'html']
    //       }
    //   ]
    // }))
    // ...
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function() {
    return gulp.src('build/*.css')
    .pipe(purgecss({
        content: ["*.html"],
        extractors: [
            {
                extractor: class TailwindExtractor {
                    static extract(content) {
                        return content.match(/[A-z0-9-:\/]+/g) || [];
                    }
                },
                extensions: ['css', 'html']
            }
        ]
    }))
    .pipe(cleanCss({specialComments: 0}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){

  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./"
      },
      notify: false
  });

  gulp.watch('src/main.css', ['tailwind']);
  gulp.watch('build/main.css', ['css']);
  gulp.watch(['./*.html', 'dist/*.css', './*.js']).on('change', browserSync.reload);

});

gulp.task('default', ['tailwind', 'css', 'watch']);