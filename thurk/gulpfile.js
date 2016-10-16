'use strict';

require('babel-core/register');

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const browserify = require('gulp-browserify');
const del = require('del');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const wrap = require('gulp-wrap');

const path = require('path');
const srcDir = 'src';

const paths = {
  serverSrc: 'src/server/**/*.js',
  serverDest: 'server',
  serverTest: 'test/server/**/*.js',
  clientSrc: 'src/client/**/*.js',
  clientDest: 'public',
  cssSrc: 'src/client/**/*.css',
  cssDest: 'public/css',

  giqlSrc: 'src/graphiql/**/*.js',
  giqlDest: 'public/graphiql'
};
const babelPresets = [
  'react-es2015'
];
const babelPlugins = [
  'transform-regenerator',
  'transform-object-assign',
  'array-includes'
];

/*
 * graphiQL client
 */

const cleanGiql = (cb) => {
  del([path.join(paths.giqlDest, '**/*.js'),
       '!' + path.join(paths.giqlDest, 'vendor/**')]).then(ps => {
    console.log('Expunged:\n' + ps.join('\n'));
    cb();
  });
};
const babelifyGiql = () => {
  return gulp.src(paths.giqlSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: babelPresets,
      plugins: babelPlugins
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.giqlDest));
};
const browserifyGiql = () => {
  return gulp.src(path.join(paths.giqlDest, 'giql.js'))
    .pipe(browserify({
      "browserify-css": {
        autoInject: true
      },
      insertGlobals: true,
      debug: true
    }))
    .pipe(wrap('(function (){ var define = undefined; <%=contents%> })()'))
    .pipe(gulp.dest(path.join(paths.giqlDest, 'bundle')));
};
const buildGiql = gulp.series(cleanGiql, gulp.parallel(babelifyGiql), browserifyGiql);

/*
 * CLIENT
 */

const cleanClient = (cb) => {
  del([path.join(paths.clientDest, '**/*.js'), path.join(paths.cssDest, '**/*.css'),
       '!' + path.join(paths.clientDest, 'vendor/**')]).then(ps => {
    console.log('Expunged:\n' + ps.join('\n'));
    cb();
  });
};

const babelify= () => {
  return gulp.src(paths.clientSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: babelPresets,
      plugins: babelPlugins
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.clientDest));
};
const css = () => {
  return gulp.src(paths.cssSrc).pipe(gulp.dest(paths.cssDest));
};
const browserifyDev = () => {
  return gulp.src(path.join(paths.clientDest, 'js/mbClient.js'))
    .pipe(browserify({
      "browserify-css": {
        autoInject: true
      },
      insertGlobals: true,
      debug: true
    }))
    .pipe(wrap('(function (){ var define = undefined; <%=contents%> })()'))
    .pipe(gulp.dest(path.join(paths.clientDest, 'js/bundle')));
};
const browserifyProd = () => {
  return gulp.src(path.join(paths.clientDest, 'js/mbClient.js'))
    .pipe(browserify({
      global: true,
      transform: ['uglifyify']
    }))
    .pipe(streamify(uglify()))
    .pipe(wrap('(function (){ var define = undefined; <%=contents%> })();'))
    .pipe(gulp.dest(path.join(paths.clientDest, 'js/bundle')));
};

const buildClientDev = gulp.series(cleanClient, gulp.parallel(babelify, css), browserifyDev);
const buildClientProd = gulp.series(cleanClient, gulp.parallel(babelify, css), browserifyProd);
const cwatch = () => {
  gulp.watch([paths.clientSrc, paths.cssSrc], buildClientDev);
};

/*
 * SERVER
 */

const cleanServer = (cb) => {
  del([path.join(paths.serverDest, '**/*.js')]).then(function(ps) {
    console.log('Expunged:\n' + ps.join('\n'));
    cb();
  });
};
const server = () => {
  return gulp.src(paths.serverSrc)
    .pipe(babel({
      plugins: babelPlugins
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.serverDest));
};
const testServer = () => {
  return gulp.src(paths.serverTest)
    .pipe(mocha({reporter: 'nyan'}));
};

const buildServer = gulp.series(cleanServer, server);
const swatch = () => {
  gulp.watch([paths.serverSrc], buildServer);
};

/*
 * TASKS
 */

gulp.task('giql', buildGiql);
gulp.task('gwatch', () => gulp.watch([paths.giqlSrc], buildGiql));

gulp.task('sclean', cleanServer);
gulp.task('server', server);
gulp.task('buildServer', buildServer);
gulp.task('testServer', testServer);
gulp.task('swatch', swatch);

gulp.task('cclean', cleanClient);
gulp.task('buildClient', buildClientDev);
gulp.task('buildClientProd', buildClientProd);
gulp.task('cwatch', cwatch);

gulp.task('default', swatch);
