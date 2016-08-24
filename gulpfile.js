var gulp = require('gulp');
var path = require('path');
var del = require('del');


//SRC AND DEST
var from ='front-end/dist/';
var to ='public/';


//Cleaning dist folder
gulp.task('clean' , function(){
    del(to);
});


//Copy files from front-end to back-end
gulp.task('copy_files' , function(){
    gulp.src(from + '**/*')
       .pipe(gulp.dest(to));
});


// watching and handle deleting of files
gulp.task('watching' , function(){
    var watcher = gulp.watch(from + '**/*'  , ['copy_files']);
    watcher.on('change', function (event) {
        if (event.type === 'deleted') {
            var filePathFromSrc = path.relative(path.resolve(from), event.path);
            var destFilePath = path.resolve(to, filePathFromSrc);
            del.sync(destFilePath);
        }
    });
});



