class Cache {
  get (data) {
    if (arguments.length === 0) {
      return null
    }
    let id
    if (typeof data === 'string') {
      id = data
    } else {
      id = data.id
    }
    return id ? this[id] : null
  }

  set (id, data) {
    if (arguments.length === 0) {
      return
    } else if (arguments.length === 1) {
      data = id
      id = data.id
    }
    if (id) {
      this[id] = data
    }
  }

  haveChange (data) {
    let cache = this[data.id]
    if (!cache) return true
    for (let key in data) {
      if (cache[key] !== data[key]) {
        return true
      }
    }
    return false
  }
}

export default Cache
