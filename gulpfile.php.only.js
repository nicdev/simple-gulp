var gulp = require('gulp');
var browserSync = require('browser-sync');
var php = require('gulp-connect-php');
var reload  = function() {
  setTimeout(browserSync.reload, 500);
}

var paths = {
  php: ['./**/*.php']
};

var ports = {
  server: 9999,
  browserSync: 10000
}

gulp.task('default', ['watch', 'browser-sync']);

gulp.task('php', function(){
  php.server({
              base: '',
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
  gulp.watch(paths.php, reload);
});