var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EventEmitter } from '../../utils/event';
/**
 * 在后台执行的任务
 * 此处的后台实指不依赖界面渲染而执行的逻辑
 */
var BackgroundTask = /** @class */ (function (_super) {
    __extends(BackgroundTask, _super);
    function BackgroundTask() {
        return _super.call(this) || this;
    }
    BackgroundTask.prototype.setFinish = function () {
        this.emit('finish');
    };
    return BackgroundTask;
}(EventEmitter));
export { BackgroundTask };
