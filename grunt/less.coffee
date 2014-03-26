module.exports =
  dev:
    files: [
      expand: true,
      cwd: '<%= meta.src.less %>/main'
      src: ['**/**/*.less']
      dest: '<%= meta.dev.css %>'
      ext: '.css'
    ]