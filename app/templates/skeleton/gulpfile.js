//'use strict';
// generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('app/app.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))  
    .pipe($.autoprefixer({browsers: ['last 3 versions','last 3 Android versions','last 3 ChromeAndroid versions'], cascade: true}))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('jshint', function () {
  return gulp.src(['!node_modules/**','!.grunt/**','!dist/**','!bower_components/**','app/**/*.js',])
  //return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
    .pipe($.csso);
    //.pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var app = require('connect')()
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('app'))
    .use(serveStatic('.tmp'))
    // paths to bower_components should be relative to the current file
    // e.g. in index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'styles'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('app/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));
  gulp.src('app/*.html')
    .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
  $.livereload.listen();
  var server = $.livereload();
  
  // watch for changes
  gulp.watch([
    '.tmp/styles/*.css',
    'app/*.html',
    'app/**/*',    
    'app/images/**/*'
  ]).on('change', function(file){
    server.changed(file.path);
  });

  gulp.watch('app/**/*.scss', ['styles']);
  gulp.watch('app/**/**/*.scss', ['styles']);
  gulp.watch('app/**/**/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});




gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});