module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    meta:
      coffee: 'source/coffee'
      js: 'app/js'
      plugins: 'app/js/plugins'
      less: 'source/less'
      css: 'app/css'
      jade: 'source/jade'
      html: 'app'
      vendor: 'app/vendor'

    autoprefixer:
      dev:
        single_file:
          src: 'app/css/app.css'
          dest: 'app/css/app.css'

    bower:
      default:
        dest: 'app/vendor/js'

    clean:
      dev: ['app/*']
      dist: ['dist']

    coffee:
      dev:
        options: 
          bare: true
        files: [
          expand: true
          cwd: '<%= meta.coffee %>'
          src: ['**/**/*.coffee']
          dest: '<%= meta.js %>'
          ext: '.js'
        ]

    # TODO: implement more intelligent and generic way of copying css files
    copy:
      css:
        files: [
          expand: true 
          flatten: true
          src: ['bower_components/bootstrap/dist/css/*', 'bower_components/font-awesome/css/*']
          dest: 'app/vendor/css/'
        ]
      fonts:
        files: [
          expand: true 
          flatten: true
          src: ['bower_components/font-awesome/fonts/*']
          dest: 'app/vendor/fonts/'
        ]
      img:
        files: [
          expand: true,
          cwd: 'source/img',
          src: ['**/**/*.{png,jpg,gif}']
          dest: 'app/img'
        ]
      meta:
        files: [
          expand: true,
          cwd: 'source/meta',
          src: ['*.txt']
          dest: 'app/'
        ]

    imagemin:
      dev:
        files: [
          expand: true,
          cwd: 'source/img',
          src: ['**/**/*.{png,jpg,gif}']
          dest: 'app/img'
        ]

    jade:
      dev:
        options:
          paths: ['<%= meta.jade %>']
        files: [
          expand: true
          cwd: '<%= meta.jade %>'
          src: ['**/**/*.jade']
          dest: '<%= meta.html %>'
          ext: '.html'
        ]

    less:
      dev:
        files: [
          expand: true,
          cwd: '<%= meta.less %>/main'
          src: ['**/**/*.less']
          dest: '<%= meta.css %>'
          ext: '.css'
        ]

    shell:
      start_server:
        command: 'node server.js'
        options:
          stdout: true
      stop_server:
        command: 'killall node' # TODO: find a better way - this will kill non-BoilerPlus node processes
        options:
          stdout: true
      ko:
        command: './bower_components/knockout/build/build.sh'
        options:
          stdout: true

    # TODO: find a way to indicate infinite desired watch depth
    watch:
      css:
        files: 'source/less/main/**/**/*.less'
        tasks: ['less:dev', 'autoprefixer:dev']
        options:
          livereload: true
      html:
        files: 'source/jade/**/**/**/**/**/*.jade'
        tasks: ['jade:dev']
        options:
          livereload: true
      js:
        files: 'source/coffee/**/**/*.coffee'
        tasks: ['coffee:dev']
        options:
          livereload: true

  # TODO:
  # - grunt-coffeelint
  # - grunt-lesslint
  # - grunt-karma
  # - grunt-bower-requirejs
  # - grunt-contrib-uglify
  # - grunt-grunticon

  npmTasks = [
    'grunt-contrib-jade', 'grunt-contrib-less', 'grunt-contrib-watch', 'grunt-contrib-coffee', 'grunt-contrib-imagemin',
    'grunt-bower', 'grunt-shell', 'grunt-contrib-copy', 'grunt-autoprefixer', 'grunt-contrib-clean'
  ]

  grunt.loadNpmTasks task for task in npmTasks

  registerTasks =
    'default': ['jade:dev', 'less:dev', 'coffee:dev', 'imagemin:dev', 'shell:ko', 'copy-libs', 'autoprefixer:dev']
    'copy-libs': ['bower:default', 'copy:css', 'copy:fonts', 'copy:meta', 'copy:img']
    'clean-dev': ['clean:dev']

  grunt.registerTask k, v for k, v of registerTasks
