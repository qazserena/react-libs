function check(permissionTree, index, path) {
    if (!permissionTree) {
        return false;
    }
    if (index >= path.length) {
        return true;
    }
    if (permissionTree.wildcard) {
        return true;
    }
    var code = path[index];
    if (permissionTree.code !== code) {
        return false;
    }
    index++;
    if (index >= path.length) {
        return true;
    }
    var nextCode = path[index];
    return check(permissionTree.children[nextCode], index, path);
}
/**
 * 检查是否有权限
 * @param permissionTree
 * @param path
 * @returns
 */
export function checkPermission(permissionTree, path) {
    if (typeof path === 'string') {
        path = path.split('/');
    }
    if (path.length === 0) {
        return false;
    }
    if (!permissionTree.code) {
        if (permissionTree.wildcard) {
            return true;
        }
        var segment = path[0];
        var children = permissionTree.children[segment];
        return check(children, 0, path);
    }
    else {
        return check(permissionTree, 0, path);
    }
}
