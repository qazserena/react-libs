var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.listeners = new Map();
    }
    EventEmitter.prototype.on = function (event, callback, callbackTarget) {
        var item = { callback: callback, callbackTarget: callbackTarget, once: false };
        this.appendItem(event, item);
    };
    EventEmitter.prototype.once = function (event, callback, callbackTarget) {
        var item = { callback: callback, callbackTarget: callbackTarget, once: true };
        this.appendItem(event, item);
    };
    EventEmitter.prototype.appendItem = function (event, item) {
        var listener = this.listeners.get(event);
        if (!listener) {
            this.listeners.set(event, [item]);
        }
        else {
            listener.push(item);
        }
    };
    EventEmitter.prototype.off = function (event, callback) {
        var listener = this.listeners.get(event);
        if (listener) {
            var index = listener.findIndex(function (item) { return item.callback === callback; });
            if (index >= 0) {
                listener.splice(index, 1);
            }
        }
    };
    EventEmitter.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var listener = this.listeners.get(event);
        if (!listener) {
            return;
        }
        for (var i = listener.length - 1; i >= 0; --i) {
            var item = listener[i];
            (_a = item.callback).call.apply(_a, __spreadArray([item.callbackTarget], args, false));
            if (item.once) {
                listener.splice(i, 1);
            }
        }
    };
    return EventEmitter;
}());
export { EventEmitter };
