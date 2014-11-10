'use strict';

//basic configuration object used by gulp tasks
module.exports = {
  port: 3000,
  tmp: 'build/tmp',
  dist: 'build/dist',
  base: 'app',
  tpl: 'app/modules/**/*.html',   
  mainScss: 'app/app.scss', 
  scss: 'app/**/*.scss', 
  js: [
    'app/modules/**/*.js',
    '!app/vendor/**/*.js',
    'app/**/*-spec.js',   //unit
    'app/test/e2e/**/*.js'  //e2e
  ],
  index: 'app/index.html',
  assets: 'app/assets/**',
  images: 'app/assets/images/**/*',
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};
