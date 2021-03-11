export const StorkenActions = (storken) => {
  let { actions } = storken.opts
  if (!actions) { return }
  const nested = actions instanceof Function

  if (nested) {
    actions = actions(storken)
  }

  storken.actions = Object.keys(actions).reduce((obj, name) => {
    const action = actions[name]
    obj[name] = (...args) => {
      storken.load(true)
      return Promise.resolve(action instanceof Function
        ? nested ? action(...args) : action(storken, ...args)
        : action)
        .then(result => {
          storken.set(result)
          storken.load(false)
          return storken.value
        })
    }

    return obj
  }, {})

  return storken.actions
}

export default StorkenActions
