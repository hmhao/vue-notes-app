const dbyte = /[^\x00-\xff]/g

export default {
  install (Vue) {
    /**
     *
     * @param {String} text
     * @param {Number} length
     * @param {String} clamp
     *
     */
    Vue.filter('truncate', function (value, maxlen = 20, clamp = '...') {
      if (value.replace(dbyte, 'mm').length <= maxlen) {
        return value
      }
      let m = Math.floor(maxlen / 2)
      for (let i = m, len = value.length; i < len; i++) {
        if (value.substr(0, i).replace(dbyte, 'mm').length >= maxlen) {
          return value.substr(0, i) + clamp
        }
      }
      return value
    })
  }
}
