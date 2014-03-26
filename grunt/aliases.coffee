module.exports =
  'default': ['jade:dev', 'less:dev', 'coffee:dev', 'imagemin:dev', 'shell:ko', 'copy-libs', 'autoprefixer:dev']
  'copy-libs': ['bower:default', 'copy:css', 'copy:fonts', 'copy:meta', 'copy:img']
  'clean-dev': ['clean:dev']
  'server': ['configureProxies:dev', 'connect:dev']