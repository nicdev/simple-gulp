var gulp = require('gulp');
var browserSync = require('browser-sync');
var php = require('gulp-connect-php');
var reload  = function() {
  setTimeout(browserSync.reload, 500);
}

var paths = {
  php: ['./**/*.php']
};

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('php', function(){
  php.server({
              base: '',
              port: 9999,
              keepalive: false,
  });
});

gulp.task('browser-sync', ['php'], function() {
  browserSync({
    proxy: '127.0.0.1:9999',
    port: 10000,
    open: true,
    notify: false
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.php, reload);
});