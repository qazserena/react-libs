/**
 * 存放在Local Storage中的缓存数据
 */
var StorageItem = /** @class */ (function () {
    function StorageItem(key) {
        this._data = null;
        this._initFromStorage = false;
        this.key = key;
    }
    Object.defineProperty(StorageItem.prototype, "data", {
        get: function () {
            if (!this._data && !this._initFromStorage) {
                var text = localStorage.getItem(this.key);
                if (text) {
                    try {
                        this._data = JSON.parse(text);
                    }
                    catch (e) {
                        console.error(e);
                        this._data = null;
                    }
                }
                this._initFromStorage = true;
            }
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (!this._data) {
                localStorage.removeItem(this.key);
            }
            else {
                localStorage.setItem(this.key, JSON.stringify(this._data));
            }
        },
        enumerable: false,
        configurable: true
    });
    return StorageItem;
}());
export { StorageItem };
