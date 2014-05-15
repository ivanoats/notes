'use strict';

process.env.PHANTOMJS_EXECUTABLE = process.env.PHANTOMJS_EXECUTABLE || '/usr/local/opt/nvm/v0.10.28/bin/phantomjs';

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['Gruntfile.js', 'server.js', 'test/api/*.js']
    },
    simplemocha: {
      options: {
        ui: 'bdd'
      },
      all: { src: ['test/api/**/*.js'] }
    },
    clean: ['dist'],
    copy: {
      all: {
        expand: true,
        cwd: 'public/',
        src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
        dest: 'dist/',
        flatten: true,
        filter: 'isFile'
      },
    },
    browserify: {
      all: {
        src: 'src/*.js',
        dest: 'dist/app.js'
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },

    express: {
      dev: {
        options: {
          background: true,
          script: 'server.js'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    casper: {
      acceptance : {
        options : {
          pre: 'node server.js',
          verbose: true,
          'log-level': 'debug',
          test : true,
        },
        files : {
          '/dev/null' : ['test/acceptance/*_test.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js','public/**','test/**/*.js']
      },
      express: {
          files: ['server.js'],
          tasks: ['express:dev'],
          options: {
            spawn: false
          }
      }
    }

  });

  grunt.registerTask('server', [ 'express:dev','watch' ]);
  grunt.registerTask('test:acceptance',['express:dev','casper']);
  grunt.registerTask('test:api','simplemocha');
  grunt.registerTask('test',['test:acceptance','test:api']);
  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('build',['clean', 'browserify', 'copy']);
};
