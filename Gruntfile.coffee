module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    meta:
      coffee: 'source/coffee'
      js: 'app/js'
      plugins: 'app/js/plugins'
      less: 'source/less'
      css: 'app/css'
      jade: 'source/jade'
      html: 'app'
      vendor: 'app/vendor'

    bower:
      default:
        dest: 'app/vendor/js'

    coffee:
      dev:
        options: 
          bare: true
        files: [
          expand: true
          cwd: '<%= meta.coffee %>'
          src: ['**/*.coffee']
          dest: '<%= meta.js %>'
          ext: '.js'
        ]

    # TODO: implement more intelligent and generic way of copying css files
    copy:
      default:
        files: [
          expand: true 
          flatten: true
          src: ['bower_components/bootstrap/dist/css/*']
          dest: 'app/vendor/css/'
        ]

    jade:
      dev:
        options:
          paths: ['<%= meta.jade %>']
        files: [
          expand: true
          cwd: '<%= meta.jade %>'
          src: ['**/*.jade']
          dest: '<%= meta.html %>'
          ext: '.html'
        ]

    less:
      dev:
        files: [
          expand: true,
          cwd: '<%= meta.less %>/main'
          src: ['**/*.less']
          dest: '<%= meta.css %>'
          ext: '.css'
        ]

    # Mostly for use with Visual Studio plugin
    shell:
      start_server:
        command: 'node server.js'
        options:
          stdout: true
      stop_server:
        command: 'killall node' # TODO: find a better way - this might kill non-server processes that are in use
        options:
          stdout: true

    watch:
      options:
        livereload: true
      files: ['source/jade/**/*.jade', 'source/less/main/**/*.less', 'source/coffee/**/*.coffee']
      tasks: ['jade:dev', 'less:dev', 'coffee:dev']

  # TODO:
  # configure tasks:
  # - grunt-coffeelint
  # - grunt-lesslint
  # - grunt-karma
  # - grunt-bower-requirejs
  # - grunt-contrib-uglify

  npmTasks = [
    'grunt-contrib-jade', 'grunt-contrib-less', 'grunt-contrib-watch', 'grunt-contrib-coffee', 
    'grunt-bower', 'grunt-shell', 'grunt-contrib-copy'
  ]

  grunt.loadNpmTasks(task) for task in npmTasks

  registerTasks =
    'default': ['jade:dev', 'less:dev', 'coffee:dev', 'bower:default', 'bower:default', 'copy:default']
    'copy-libs': ['bower:default', 'copy:default']

  grunt.registerTask(k, v) for k,v of registerTasks
