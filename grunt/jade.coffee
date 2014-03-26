module.exports =
  dev:
    options:
      paths: ['<%= meta.src.jade %>']
    files: [
      expand: true
      cwd: '<%= meta.src.jade %>'
      src: ['**/**/*.jade']
      dest: '<%= meta.dev.html %>'
      ext: '.html'
    ]