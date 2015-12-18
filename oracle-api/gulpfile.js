/**
 * Created by nrei1 on 30/05/2015.
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
    nodemon({
        script:'index.js',
        ext:'js json sql',
        ignore:['node_modules/*'],
    });
});

gulp.task('default', ['nodemon']); 