'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var del = require('del');
var streamify = require('gulp-streamify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var transform = require('vinyl-transform');
var rename = require("gulp-rename");

// Build options.
var opts = {
	jsEntryFile: './public/javascripts/comments.jsx',
	bundleName: 'app.js',
	app: {
		globs: {
			css: {
				base: 'app/assets/css/base.scss',
				modules: 'app/modules/**/*.scss'
			},
			assets: 'app/assets/**',
			assetsExclude: '!app/assets/css{,/**}'
		}
	},
	dist: {
		paths: {
			root: 'public/bundle/',
                        javascript: 'public/bundle/javascripts',
			css: 'public/bundle/stylesheets',
			assets: 'public/bundle/images'
		}
	}
};

/*

// Bundle js.
function jsBundler (bundler) {
	return bundler.bundle()
		// Log errors if they happen.
		.on('error', function (e) {
			gutil.log('Browserify Error', e.message);
		})
                .on('prebundle', function(bundler) {
                  //bundler.require('./public/javascripts/comments.js'); 
                    bundle.require("react");
                })
		.pipe(source(opts.bundleName))
		//.pipe(streamify(uglify()))
		.pipe(gulp.dest(opts.dist.paths.javascript));
}

// Live watch js changes.
gulp.task('watchify', function () {
	var b = browserify(watchify.args);
	b.add(opts.jsEntryFile);

	var bundler = watchify(b);

	bundler.on('update', jsBundler.bind(this, bundler));

	return jsBundler(bundler);
});

// One-off js bundle.
gulp.task('browserify', function () {
	var bundler = browserify(opts.jsEntryFile);

	return jsBundler(bundler);
});
*/

gulp.task('browserify', function () {
  // browserify -r react -r public/javascripts/comments.jsx > public/bundle/javascripts/bundle.js
  var browserified = transform(function(filename) {
    return browserify()

      // -r react
      // update below with the correct path to react/react.js node_module
      .require('./node_modules/react/react.js', { expose: 'react'})

      // -r public/javascripts/comments.jsx
      .require(filename, {expose: 'myComments'})
      .bundle();
  });
  return gulp.src(opts.jsEntryFile)
    .pipe(browserified)
    .pipe(rename(opts.bundleName))
    .pipe(gulp.dest(opts.dist.paths.javascript));
});

// Compiles and minifies sass to a single css file.
function compileSass (compileGlob, outName) {
	gulp.src(compileGlob)
		.pipe(sass({
			// https://github.com/sass/node-sass/issues/337
			sourceComments: 'map',
			sourceMap: 'sass'
		}))
		.pipe(minifyCSS())
		.pipe(concat(outName))
		.pipe(gulp.dest(opts.dist.paths.css));
}

// Sass compilation for base styles.
gulp.task('styles-base', function () {
	compileSass(opts.app.globs.css.base, 'base.css');
});

// Sass compilation for module styles.
gulp.task('styles-modules', function () {
	compileSass(opts.app.globs.css.modules, 'modules.css');
});

// Copy all static assets.
gulp.task('copy', function () {
	gulp.src([opts.app.globs.assets, opts.app.globs.assetsExclude])
		.pipe(gulp.dest(opts.dist.paths.assets));
});

// Clean build.
gulp.task('clean', function () {
    del(opts.dist.paths.root);
});

// Watch non-js stuff.
gulp.task('watch', function () {
	gulp.watch(opts.app.globs.css.base, ['styles-base']);
	gulp.watch(opts.app.globs.css.modules, ['styles-modules']);

	gulp.watch([
		opts.app.globs.assets
	], ['copy']);
});

// The default task (called when you run `gulp`).
gulp.task('default', [
	'clean',
	'copy',
	'styles-base',
	'styles-modules',
        'browserify'
//	'watch',
//	'watchify'
]);
