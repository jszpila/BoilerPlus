module.exports =
  js:
    files: [
      expand:  true
      flatten: true
      src: [
        '<%= meta.bower %>/director/build/director.js',
        '<%= meta.bower %>/bootstrap/dist/js/bootstrap.js',
        '<%= meta.bower %>/jquery/jquery.js',
        '<%= meta.bower %>/knockout/build/output/knockout-latest.debug.js',
        '<%= meta.bower %>/modernizr/modernizr.js',
        '<%= meta.bower %>/platform/platform.js',
        '<%= meta.bower %>/requirejs/require.js'
      ]
      dest: '<%= meta.dev.vendor.js %>'
    ]
  css:
    files: [
      expand: true
      flatten: true
      src: [
        '<%= meta.bower %>/bootstrap/dist/css/*',
        '<%= meta.bower %>/font-awesome/css/*'
      ]
      dest: '<%= meta.dev.vendor.css %>'
    ]
  fonts:
    files: [
      expand: true
      flatten: true
      src: ['<%= meta.bower %>/font-awesome/fonts/*']
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