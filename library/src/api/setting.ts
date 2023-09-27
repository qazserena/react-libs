/**
 * api配置
 */
export class ApiSetting<T extends Object> {
  private _data: T

  get data() {
    return this._data
  }

  constructor(private key: string, defaultValue: T) {
    if (!window[key]) {
      window[key] = defaultValue
    }
    this._data = window[key]
  }

  setup(value: T) {
    Object.assign(window[this.key], value)
  }
}
