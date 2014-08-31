module.exports = {
  dist: {
    options: {
      compress: {
        drop_console: false
      }
    },
    files: {
      '<%= distPath %>/chValidator.min.js': [
        '<%= distPath %>/chValidator.js'
      ]
    }
  }
};