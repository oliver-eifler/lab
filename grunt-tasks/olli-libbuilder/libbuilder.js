'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var _ = require('underscore');
  function process(src)
  {
    if (!grunt.file.exists(src))
    {
        grunt.log.error("file not found: "+src);
        return;
    }
    grunt.log.write(" >> "+src+" ");
    var content = "/* "+src+" */\n"+grunt.file.read(src);
    //replace module (umd) code

    content = content.replace(/typeof\s*module\s*={2,3}\s*['|"]object['|"]/gmi, "false");
    content = content.replace(/typeof\s*define\s*={2,3}\s*['|"]function['|"]/gmi, "false");
    //remove debug code
    content = content.replace(/\/\*!START_DEBUG(?:.|[\n\r])*?END_DEBUG\*\//gmi, "/* debug removed */");
    grunt.log.ok("added");
    return content;
  };
  function buildLib(options,name,files)
  {
    var dest = options.destPath+name+options.ext;
    var content = "/*Lib builder - "+name+options.ext +": ("+files+")*/\n";

    grunt.log.writeln("building: "+dest);
    files.forEach(function( file ) {
        content += process( options.srcPath + file) + '\n\n\n';
        });
    grunt.file.write( dest, content);
    grunt.log.ok();

  }
  grunt.task.registerMultiTask('lib', 'Build js libs based on several js files', function() {
        var self = this
            ,done = this.async()
            ,files = this.data.src
            ,basePath = this.data.basePath
            ,newContents = "/*Lib builder - "+this.data.dest +": ("+files+")*/\n";

        grunt.log.writeln( "building "+this.data.dest +': ('+files+')' );

        files.forEach(function( name ) {
            //newContents += grunt.file.read( basePath + name) + '\n';
            newContents += process( basePath + name) + '\n\n\n';
        });
        grunt.file.write( this.data.dest, newContents );
        done();
  });
  grunt.task.registerMultiTask('liball', 'Build js libs based JSON config', function() {
        var self = this
            ,done = this.async()
            ,options = this.options({srcPath:"",destPath:"",ext:".lib",exclude:[],include:"all"})
            ,libs = this.data.libs
            ,liblist = [];
            if (typeof options.exclude === 'string')
                options.exclude =options.exclude.split(/\s*,\s*/);
            if (typeof options.include === 'string')
            {
                if (options.include.toLowerCase() == "all")
                    options.include = [];
                else
                    options.include =options.include.split(/\s*,\s*/);
            }

            console.log(typeof options.exclude);
            _.each(libs, function(value, key){
                liblist.push(key);
            });
            if (_.isArray(options.include) && options.include.length)
                liblist = _.intersection(liblist,options.include);
            if (_.isArray(options.exclude) && options.exclude.length)
                liblist = _.difference(liblist,options.exclude);

            liblist.forEach(function(lib) {
              buildLib(options,lib,libs[lib]);
            });

        done();
  });
};