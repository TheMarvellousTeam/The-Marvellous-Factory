var gulp = require('gulp')
  , exec = require('child_process').exec
  , watch = require('gulp-watch')
  , rename = require('gulp-rename')
  , browserify = require('gulp-browserify')
  , autoprefixer = require('gulp-autoprefixer')
  , less =require('less')
  , Stream = require('stream').Stream




gulp.task('browserify', function () {
    /*
    return gulp.src( './js/app.js' )
    .pipe( browserify({
        outfile : './js/bundle.js',
        debug : true
    }))
    .on('data', function(e){
        console.log(e)
    })
    .pipe(gulp.dest('./js/'))
    */

    exec(
        'node ./node_modules/browserify/bin/cmd.js js/app.js -o js/bundle.js --debug ' ,
        function( err , out , code ){
            if(err)
                console.log( err )
        }
    )
});

gulp.task('test', function () {

    var runner = require('./node_modules/jasmine-node/lib/jasmine-node/runner.js');

    runner.runSpecs({
        specFolders : ['./specs'],
        matchAll : true,
    });
});

gulp.task('less', function () {

    var lessify = function(options){
        options = options || {}

        var stream = new Stream();
        stream.writable = stream.readable = true
        var pending = 0,closed=false;
        stream.write = function( file ){

            options.fileName = file.path

            pending++
            less.render(
                file.contents.toString('utf8'),
                options,
                function (e, css) {
                    if(e)
                        console.log(file.path+'\nline:'+e.line+': '+e.extract[2]+'\n'+e.message)

                    var f = file.path.split('.')
                    f[f.length-1] = 'css'

                    file.path = f.join('.')
                    file.contents = new Buffer(css||'')
                    stream.emit('data',file)

                    pending--
                    stream.end()
                }
            );
        }
        stream.destroy = function(){ this.emit('close') };
        stream.end = function(){
            if(closed||pending)
                return
            this.emit('end')
            closed = true
        }
        return stream
    }

    return gulp.src( './css/app.less' )
    .pipe( lessify({
        compress: false,
        paths: ['./css'],
    }))
    .pipe(autoprefixer({
        cascade: true,
        browsers: ['last 2 versions'],
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./css'))
});


gulp.task('watch', function () {

	gulp.watch( ['css/**/*.less'] , ['less'] )

	gulp.watch( ['js/**/*', '!js/bundle.js'] , ['browserify'] )

});


gulp.task('default', [ 'browserify' , 'less' , 'watch' ]);
