/**
 * api配置
 */
var ApiSetting = /** @class */ (function () {
    function ApiSetting(key, defaultValue) {
        this.key = key;
        if (!window[key]) {
            window[key] = defaultValue;
        }
        this._data = window[key];
    }
    Object.defineProperty(ApiSetting.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    ApiSetting.prototype.setup = function (value) {
        Object.assign(window[this.key], value);
    };
    return ApiSetting;
}());
export { ApiSetting };
