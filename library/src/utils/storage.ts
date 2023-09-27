/**
 * 存放在Local Storage中的缓存数据
 */
export class StorageItem<T> {
  private _data: T | null = null

  private _initFromStorage = false
  private key: string

  constructor(key: string) {
    this.key = key
  }

  get data(): T | null {
    if (!this._data && !this._initFromStorage) {
      const text = localStorage.getItem(this.key)

      if (text) {
        try {
          this._data = JSON.parse(text)
        } catch (e) {
          console.error(e)
          this._data = null
        }
      }
      this._initFromStorage = true
    }
    return this._data
  }

  set data(value: T | null) {
    this._data = value
    if (!this._data) {
      localStorage.removeItem(this.key)
    } else {
      localStorage.setItem(this.key, JSON.stringify(this._data))
    }
  }
}
