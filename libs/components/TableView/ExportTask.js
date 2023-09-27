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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Progress } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackgroundTask } from '../BackgroundTask';
var BackgroundExportTask = /** @class */ (function (_super) {
    __extends(BackgroundExportTask, _super);
    function BackgroundExportTask(dataProvider, condition, timezone) {
        var _this = _super.call(this) || this;
        _this.dataProvider = dataProvider;
        _this.condition = condition;
        _this.timezone = timezone;
        _this.data = { progress: 0, file: '', finish: false };
        _this.jobId = 0;
        _this.refresh = function () { return __awaiter(_this, void 0, void 0, function () {
            var jobInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.dataProvider.getJob(this.jobId)];
                    case 1:
                        jobInfo = _a.sent();
                        if (jobInfo.finish) {
                            this.data.finish = true;
                            this.data.file = jobInfo.userdata;
                            this.data.progress = 100;
                            this.setFinish();
                            this.clearTimer();
                        }
                        else {
                            this.data.progress = Math.floor(jobInfo.progress * 100);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    BackgroundExportTask.prototype.onStart = function () {
        var _this = this;
        this.timer = window.setInterval(this.refresh, 100);
        this.dataProvider
            .export(this.condition, this.timezone)
            .then(function (taskId) {
            _this.jobId = taskId;
        })
            .catch(function (e) {
            console.error(e);
        });
    };
    BackgroundExportTask.prototype.getTaskData = function () {
        return this.data;
    };
    BackgroundExportTask.prototype.onFinalize = function () {
        this.clearTimer();
    };
    BackgroundExportTask.prototype.clearTimer = function () {
        if (this.timer > 0) {
            window.clearInterval(this.timer);
            this.timer = 0;
        }
    };
    return BackgroundExportTask;
}(BackgroundTask));
export { BackgroundExportTask };
export var ExportTaskView = function (props) {
    var _a = useState({ file: '', finish: false, progress: 0 }), data = _a[0], setData = _a[1];
    var refreshTimer = useRef();
    var clearTimer = function () {
        if (refreshTimer.current) {
            window.clearInterval(refreshTimer.current);
            refreshTimer.current = 0;
        }
    };
    var refresh = useCallback(function () {
        var data0 = props.task.getTaskData();
        if (data0.finish) {
            clearTimer();
        }
        setData(__assign({}, data0));
    }, [setData, props.task]);
    useEffect(function () {
        refreshTimer.current = window.setInterval(function () {
            refresh();
        }, 500);
        return clearTimer;
    }, []);
    return (React.createElement("div", { style: { width: '100%' } },
        !data.finish ? (React.createElement("div", null,
            "[",
            props.schema.label,
            "]\u6B63\u5728\u5BFC\u51FA...")) : (React.createElement("div", null,
            React.createElement("span", null,
                "[",
                props.schema.label,
                "]\u5BFC\u51FA\u5B8C\u6210"),
            React.createElement("a", { href: data.file, target: "_blank", style: { marginLeft: '10px' } }, "\u70B9\u51FB\u4E0B\u8F7D"))),
        React.createElement(Progress, { percent: data.progress })));
};
