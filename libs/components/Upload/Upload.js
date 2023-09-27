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
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Upload as AntdUpload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
export var Upload = function (props) {
    var showTrigger = useMemo(function () {
        return props.listType !== 'picture-card';
    }, [props.listType]);
    var _a = useState(), fileList = _a[0], setFileList = _a[1];
    var defaultFileList = useMemo(function () {
        if (typeof props.value === 'string') {
            return [
                {
                    uid: props.value,
                    name: '',
                    status: 'done',
                    url: props.value,
                },
            ];
        }
        else if (Array.isArray(props.value)) {
            return props.value.map(function (value) {
                return {
                    uid: value,
                    name: '',
                    status: 'done',
                    url: value,
                };
            });
        }
        else {
            return [];
        }
    }, [props.value]);
    useEffect(function () {
        setFileList(defaultFileList);
    }, [defaultFileList]);
    var handleChange = function (info) {
        if (info.file.status !== 'done') {
            setFileList(info.fileList);
        }
        else {
            var results = info.fileList.map(function (file) {
                return file.response || file.url;
            });
            if (props.maxCount === 1) {
                props.onChange && props.onChange(results[0]);
            }
            else {
                props.onChange && props.onChange(results);
            }
        }
    };
    return (React.createElement(AntdUpload, __assign({}, props, { maxCount: props.maxCount, fileList: fileList, name: "file", onChange: handleChange }), showTrigger ? (React.createElement(Button, { icon: React.createElement(UploadOutlined, null) }, "\u70B9\u51FB\u4E0A\u4F20")) : (React.createElement("span", null, "\u70B9\u51FB\u4E0A\u4F20"))));
};
