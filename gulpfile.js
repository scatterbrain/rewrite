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

var reactify = require('reactify');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

// Build options.
var opts = {
        //What files browserify will use as start points for deps for for writer_bundle.js
	writerBundleEntries: ['./public/javascripts/writer.jsx'], //, './public/javascripts/stores/write_store.js'],

	bundleName: 'writer_bundle.js',
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


// Bundle js.
function jsBundler (bundler) {
        gutil.log("Starting bundle");
    // 
	var bundle = bundler
                //Note, if you need to require react or scripts from bundle,
                //they need to be required with -r flag
                // browserify -r react -r public/javascripts/comments.jsx > public/bundle/javascripts/bundle.js   
                // -r react
                // update below with the correct path to react/react.js node_module
                //.require('./node_modules/react/react.js', { expose: 'react'})
                // -r public/javascripts/comments.jsx
                //.require('./public/javascripts/comments.jsx', {expose: 'myComments'})
                .bundle()
		// Log errors if they happen.
		.on('error', function (e) {
			gutil.log('Browserify Error', e.message);
		})
		.pipe(source(opts.bundleName))
		//.pipe(streamify(uglify()))
		.pipe(gulp.dest(opts.dist.paths.javascript));

        gutil.log("Bundling done");                
        return bundle;
}

// Live watch js changes.
gulp.task('watchify', function () {
        var args = {
            entries: opts.writerBundleEntries, // Only need initial file, browserify finds the deps
            debug: true, // Gives us sourcemapping
            cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
        };
	var b = browserify(args);

	var bundler = watchify(b);

	bundler.on('update', jsBundler.bind(this, bundler));

	return jsBundler(bundler);
});

// One-off js bundle.
gulp.task('browserify', function () {
        var args = {
            entries: opts.writerBundleEntries, // Only need initial file, browserify finds the deps
            debug: true // Gives us sourcemapping
        };

	var bundler = browserify(args);
	return jsBundler(bundler);
});

function handleError(task) {
    return function(err) {
        gutil.log(gutil.colors.red(err));
        notify.onError(task + ' failed, check the logs..')(err);

        // Keep gulp or browserify from hanging on this task
        this.emit('end');
    };
};

gulp.task('test', function () {
    var componentToTestPath = gutil.env.tests;
    var bundler = browserify(componentToTestPath, watchify.args);

    if(gutil.env.watch) {
        livereload.listen();
        bundler = watchify(bundler);
    }

    bundler.transform(reactify);

    var rebundle = function() {
        bundler.bundle()
           .on('error', handleError('Browserify'))
            .pipe(source(componentToTestPath))
            .pipe(gulp.dest('./.tmp/'))
            .pipe(gulpif(gutil.env.watch, livereload()));
    };

    bundler.on('update', rebundle);

    return rebundle();
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
        'browserify',
	'watch'
//	'watchify'
]);
