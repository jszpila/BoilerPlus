module.exports = (grunt) ->
  require('load-grunt-config')(grunt,
    config:
      meta:
        bower: 'bower_components'
        src:
          coffee: 'src/coffee'
          less:   'src/less'
          jade:   'src/jade'
          img:    'src/img'
          meta:   'src/meta'
        dev:
          root: 'public'
          js:   'public/js'
          css:  'public/css'
          html: 'public'
          img:  'public/img'
          vendor:
            js:    'public/vendor/js'
            css:   'public/vendor/css'
            fonts: 'public/vendor/fonts'
        dist:
          root: 'dist'
          js:   'dist/js'
          css:  'dist/css'
          html: 'dist'
          img:  'dist/img'
          vendor:
            js:    'dist/vendor/js'
            css:   'dist/vendor/css'
            fonts: 'dist/vendor/fonts'
    )

  # TODO:
  # - grunt-coffeelint
  # - grunt-lesslint
  # - grunt-bower-requirejs
  # - grunt-contrib-uglify
  # - grunt-grunticon

  registerTasks =
    'default':   ['jade:dev', 'less:dev', 'coffee:dev', 'imagemin:dev', 'shell:ko', 'copy-libs', 'autoprefixer:dev']
    'copy-libs': ['copy:js', 'copy:css', 'copy:fonts', 'copy:meta', 'copy:img']
    'clean-dev': ['clean:dev']
    'server':    ['configureProxies:dev', 'connect:dev']

  grunt.registerTask k, v for k, v of registerTasks
