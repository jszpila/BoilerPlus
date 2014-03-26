module.exports =
  dev:
    options:
      bare: true
    files: [
      expand: true
      cwd: '<%= meta.src.coffee %>'
      src: ['**/**/*.coffee']
      dest: '<%= meta.dev.js %>'
      ext: '.js'
    ]