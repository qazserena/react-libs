import React from 'react';
import { PermissionData, PermissionTree } from '../../api/permission';
/**
 * 依赖信息
 */
type DependencyDict = {
    [key: string]: string[];
};
/**
 * 互斥的组
 */
type MutexGroup = string[];
export interface PermissionEditorProps {
    value?: PermissionTree;
    onChange?: (value: PermissionTree) => void;
    treeData?: PermissionData;
    defaultExpandAll?: boolean;
    mutexes?: MutexGroup[];
    /**
     * 依赖的组
     */
    dependencies?: DependencyDict;
}
/**
 * 权限编辑组件
 * @param props
 * @returns
 */
declare const PermissionEditor: (props: PermissionEditorProps) => React.JSX.Element;
export { PermissionEditor };
