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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useImperativeHandle, useMemo, useState } from 'react';
import { Badge, List, Space, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
export var backgroundTaskApi = React.createRef();
/**
 *
 * @param props 后台任务指示器
 * @returns
 */
export var BackgroundTaskIndicator = function (_props) {
    var _a = useState([]), items = _a[0], setItems = _a[1];
    var counter = useMemo(function () {
        return items.length;
    }, [items]);
    useImperativeHandle(backgroundTaskApi, function () {
        return {
            add: function (task, taskViewRender) {
                task.onStart();
                task.once('finish', function () {
                    setItems(function (items) {
                        return items.map(function (i) {
                            if (i.task === task) {
                                return __assign(__assign({}, i), { finish: true });
                            }
                            return i;
                        });
                    });
                });
                setItems(__spreadArray(__spreadArray([], items, true), [{ task: task, finish: false, taskViewRender: taskViewRender }], false));
            },
        };
    });
    var taskListItemRender = function (item) {
        var actions = item.finish
            ? [
                React.createElement("a", { key: "clear", onClick: function () {
                        setItems(function (items) { return items.filter(function (i) { return i !== item; }); });
                    } }, "\u6E05\u9664"),
            ]
            : undefined;
        return React.createElement(List.Item, { actions: actions }, item.taskViewRender(item.task));
    };
    // 套了一个无用的<>避免警告
    var overlay = (React.createElement("div", null,
        React.createElement(List, { size: "small", style: { width: '700px', minHeight: '200px' }, dataSource: items, renderItem: taskListItemRender })));
    return (React.createElement(Popover, { content: overlay, placement: "bottom", trigger: "click", title: "\u4EFB\u52A1\u961F\u5217" },
        React.createElement("a", { onClick: function (e) { return e.preventDefault(); } },
            React.createElement(Space, null,
                React.createElement(Badge, { count: counter, size: "small", style: { boxShadow: 'none' } }, React.createElement(BellOutlined, { shape: "suqare" }))))));
};
