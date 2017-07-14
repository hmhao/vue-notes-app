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
    this[id] = JSON.parse(JSON.stringify(data))
  }

  haveChange (data) {
    let cache = this[data.id]
    for (let key in data) {
      if (cache[key] !== data[key]) {
        return true
      }
    }
    return false
  }
}

export default Cache
