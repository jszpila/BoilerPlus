module.exports =
  dev:
    files: [
      expand: true,
      cwd: '<%= meta.src.img %>',
      src: ['**/**/*.{png,jpg,gif}']
      dest: '<%= meta.dev.img %>'
    ]