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
import React, { useContext } from 'react';
import { AuthContext } from '../../index';
import { checkPermission } from './helper';
/**
 * 需要登录后才显示子节点
 * @param props
 * @returns
 */
export var Authorize = function (props) {
    var currentUser = useContext(AuthContext).currentUser;
    if (currentUser) {
        return React.createElement(React.Fragment, null, props.children);
    }
    return null;
};
/**
 * 高阶组件,登录后才渲染
 * @param C
 * @returns
 */
export function withAuthorize(C) {
    return function (props) {
        return (React.createElement(Authorize, null,
            React.createElement(C, __assign({}, props))));
    };
}
/**
 * 需要拥有指定权限才渲染子节点
 * @param props
 * @returns
 */
export var Permission = function (props) {
    var currentUser = useContext(AuthContext).currentUser;
    if (currentUser && checkPermission(currentUser.permissionTree, props.permissionPath)) {
        return React.createElement(React.Fragment, null, props.children);
    }
    return null;
};
/**
 * 高阶组件,有指定权限才渲染
 * @param C
 * @returns
 */
export function withPermission(C, permissionPath) {
    return function (props) {
        return (React.createElement(Permission, { permissionPath: permissionPath },
            React.createElement(C, __assign({}, props))));
    };
}
