import React, { useCallback, useMemo } from 'react';
import { Tree } from 'antd';
function initTree(index, keys, tree, isLeaf) {
    if (index >= keys.length) {
        return;
    }
    var key = keys[index];
    var child = tree.children[key];
    var wildcard = index + 1 === keys.length && !isLeaf;
    if (!child) {
        child = { code: key, wildcard: wildcard, children: {} };
        tree.children[key] = child;
    }
    else {
        if (wildcard) {
            child.wildcard = true;
            child.children = {};
        }
    }
    if (child.wildcard) {
        return;
    }
    initTree(++index, keys, child, isLeaf);
}
function buildPermissionTree(checkedNodes) {
    var tree = { code: '', wildcard: false, children: {} };
    for (var _i = 0, checkedNodes_1 = checkedNodes; _i < checkedNodes_1.length; _i++) {
        var node = checkedNodes_1[_i];
        var isLeaf = node.isLeaf;
        var keys = node.key.split('|');
        initTree(0, keys, tree, isLeaf);
    }
    return tree;
}
function permission2node(data, prefix, checkedKeys, dependencies) {
    var key = prefix ? prefix + '|' + data.code : data.code;
    var title = data.name || data.code;
    var childrenKey = Object.keys(data.children);
    var disabled = false;
    if (dependencies) {
        var requireKeys = dependencies[key];
        if (requireKeys && requireKeys.findIndex(function (k) { return !checkedKeys.includes(k); }) >= 0) {
            disabled = true;
        }
    }
    return {
        key: key,
        title: title,
        isLeaf: childrenKey.length === 0,
        permissionData: data,
        disabled: disabled,
        children: childrenKey
            .sort()
            .map(function (childrenKey) { return permission2node(data.children[childrenKey], key, checkedKeys, dependencies); }),
    };
}
function permission2keys(permissionTree, permissionData, prefix) {
    var list = [];
    if (permissionTree.code) {
        prefix = prefix ? prefix + '|' + permissionTree.code : permissionTree.code;
        if (permissionTree.wildcard) {
            list.push(prefix);
            return list;
        }
    }
    else {
        if (permissionTree.wildcard) {
            list.push.apply(list, Object.keys(permissionData.children));
            return list;
        }
    }
    var count = 0;
    if (permissionTree.children) {
        for (var key in permissionTree.children) {
            ++count;
            var child = permissionTree.children[key];
            list.push.apply(list, permission2keys(child, permissionData && permissionData.children[key], prefix));
        }
    }
    if (count === 0 && prefix) {
        list.push(prefix);
    }
    return list;
}
/**
 * 权限编辑组件
 * @param props
 * @returns
 */
var PermissionEditor = function (props) {
    var checkedKeys = useMemo(function () {
        if (!props.value || !props.treeData) {
            return [];
        }
        return permission2keys(props.value, props.treeData, '');
    }, [props.value, props.treeData]);
    var nodes = useMemo(function () {
        if (!props.treeData) {
            return [];
        }
        var items = [];
        if (props.treeData.code) {
            items.push(permission2node(props.treeData, '', checkedKeys, props.dependencies));
        }
        else {
            Object.keys(props.treeData.children)
                .sort()
                .forEach(function (key) {
                items.push(permission2node(props.treeData.children[key], '', checkedKeys, props.dependencies));
            });
        }
        return items;
    }, [props.treeData, checkedKeys, props.dependencies]);
    var handleCheck = useCallback(function (_checkedKeys, e) {
        var checkedNodes = e.checkedNodes;
        if (e.checked && checkedNodes.length > 0 && props.mutexes) {
            // 排除互斥
            var newCheckedNode_1 = e.node;
            if (newCheckedNode_1.isLeaf) {
                var _loop_1 = function (mutex) {
                    if (mutex.includes(newCheckedNode_1.key)) {
                        checkedNodes = checkedNodes.filter(function (node) { return node.key === newCheckedNode_1.key || !mutex.includes(node.key); });
                    }
                };
                for (var _i = 0, _a = props.mutexes; _i < _a.length; _i++) {
                    var mutex = _a[_i];
                    _loop_1(mutex);
                }
            }
            else {
                // TODO
                console.log('fix.e');
            }
        }
        // 检查依赖
        if (!e.checked && props.dependencies) {
            // 找出依赖此节点的的
            checkedNodes = checkedNodes.filter(function (node) {
                var requireKeys = props.dependencies[node.key];
                if (!requireKeys) {
                    return true;
                }
                return !requireKeys.includes(e.node.key);
            });
        }
        // 构建权限树
        var permissionTree = buildPermissionTree(checkedNodes);
        props.onChange && props.onChange(permissionTree);
    }, [props.treeData, props.mutexes, props.dependencies]);
    if (!props.treeData) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(Tree, { treeData: nodes, defaultExpandAll: props.defaultExpandAll, checkedKeys: checkedKeys, checkable: true, selectable: false, showIcon: false, showLine: true, onCheck: handleCheck }));
};
export { PermissionEditor };
