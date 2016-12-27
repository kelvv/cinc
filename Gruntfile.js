module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      build: {
        src: 'containers/postPanel/postPanel.js',
        dest: 'build/postPanel.min.js'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-uglify')

  grunt.registerTask('default', ['uglify'])
}
