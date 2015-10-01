var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var php = require('gulp-connect-php');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var reload  = function() {
  setTimeout(browserSync.reload, 500);
}

var paths = {
  sass: ['./resources/assets/styles/**/*.scss'],
  scripts: ['./resources/assets/js/**/*.js', '!./resources/assets/js/libs/**/*'],
  images: ['./resources/assets/images/**/*'],
  php: ['./app/**/*.php', './resources/**/*.blade.php']
};

var ports = {
  server: 7777,
  browserSync: 12345
}


gulp.task('default', ['watch', 'sass', 'scripts', 'images', 'browser-sync']);

gulp.task('sass', function () {
    gulp.src(paths.sass)
      .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/styles'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 4
    }))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('php', function(){
  php.server({
              base: 'public',
              port: ports.server,
              keepalive: false,
  });
});

gulp.task('browser-sync', ['php'], function() {
  browserSync({
    proxy: '127.0.0.1:' + ports.server,
    port: ports.browserSync,
    open: true,
    notify: false
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', reload]);
  gulp.watch(paths.scripts, ['scripts', reload]);
  gulp.watch(paths.images, ['images', reload]);
  gulp.watch(paths.php, reload);
});
