module.exports =
  css:
    files: '<%= meta.src.less %>/main/**/**/*.less'
    tasks: ['less:dev', 'autoprefixer:dev']
    options:
      livereload: true
  html:
    files: '<%= meta.src.jade %>/**/**/**/**/**/*.jade'
    tasks: ['jade:dev']
    options:
      livereload: true
  js:
    files: '<%= meta.src.coffee %>/**/**/*.coffee'
    tasks: ['coffee:dev']
    options:
      livereload: true