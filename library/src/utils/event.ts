interface Listener {
  once: boolean
  callback: Function
  callbackTarget?: Object
}

export class EventEmitter {
  private listeners = new Map<string, Listener[]>()

  on(event: string, callback: Function, callbackTarget?: Object) {
    const item = { callback, callbackTarget, once: false }
    this.appendItem(event, item)
  }

  once(event: string, callback: Function, callbackTarget?: Object) {
    const item = { callback, callbackTarget, once: true }
    this.appendItem(event, item)
  }

  private appendItem(event: string, item: Listener) {
    const listener = this.listeners.get(event)
    if (!listener) {
      this.listeners.set(event, [item])
    } else {
      listener.push(item)
    }
  }

  off(event: string, callback: Function) {
    const listener = this.listeners.get(event)
    if (listener) {
      const index = listener.findIndex(item => item.callback === callback)
      if (index >= 0) {
        listener.splice(index, 1)
      }
    }
  }

  emit(event: string, ...args: any[]) {
    const listener = this.listeners.get(event)
    if (!listener) {
      return
    }
    for (let i = listener.length - 1; i >= 0; --i) {
      const item = listener[i]
      item.callback.call(item.callbackTarget, ...args)
      if (item.once) {
        listener.splice(i, 1)
      }
    }
  }
}
