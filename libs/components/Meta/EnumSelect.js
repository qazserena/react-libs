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
import React from 'react';
import { Select } from 'antd';
import { useContext, useMemo } from 'react';
import { MetaContext } from '../../contexts';
/**
 * 枚举选择组件
 * @param props
 * @returns
 */
export var EnumSelect = function (props) {
    var meta = useContext(MetaContext);
    var items = useMemo(function () {
        var em = meta.getEnum(props.enumName);
        return em ? em.items : [];
    }, [meta, props.enumName]);
    var selectProps = __assign({}, props);
    delete selectProps['enumName'];
    return (React.createElement(Select, __assign({}, selectProps), items.map(function (item) {
        return (React.createElement(Select.Option, { key: item.code, value: item.value }, item.label));
    })));
};
