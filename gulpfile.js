var tailwindcss = require('tailwindcss');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var purgecss = require('gulp-purgecss');
var cleanCss = require('gulp-clean-css');


gulp.task('default', function () {
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
    // ...
    .pipe(gulp.dest('build/'));
});

gulp.task('mini', function() {
    return gulp.src('build/*css')
        .pipe(cleanCss({specialComments: 0}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
    gulp.watch('src/main.css', ['default']);
    gulp.watch('dist/main.css', ['mini']);
})