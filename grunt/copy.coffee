module.exports =
  css:
    files: [
      expand: true
      flatten: true
      src: ['bower_components/bootstrap/dist/css/*', 'bower_components/font-awesome/css/*']
      dest: '<%= meta.dev.vendor.css %>'
    ]
  fonts:
    files: [
      expand: true
      flatten: true
      src: ['bower_components/font-awesome/fonts/*']
      dest: '<%= meta.dev.vendor.fonts %>'
    ]
  img:
    files: [
      expand: true,
      cwd: '<%= meta.src.img %>',
      src: ['**/**/*.{png,jpg,gif}']
      dest: '<%= meta.dev.img %>'
    ]
  meta:
    files: [
      expand: true,
      cwd: '<%= meta.src.meta %>',
      src: ['*.txt']
      dest: '<%= meta.dev.root %>/'
    ]