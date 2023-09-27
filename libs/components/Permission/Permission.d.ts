import React from 'react';
interface AuthorizeProps {
    children: React.ReactNode;
}
/**
 * 需要登录后才显示子节点
 * @param props
 * @returns
 */
export declare const Authorize: React.FC<AuthorizeProps>;
/**
 * 高阶组件,登录后才渲染
 * @param C
 * @returns
 */
export declare function withAuthorize<Props extends JSX.IntrinsicAttributes>(C: React.FC<Props>): React.FC<Props>;
interface PermissionProps {
    children: React.ReactNode;
    permissionPath: string;
}
/**
 * 需要拥有指定权限才渲染子节点
 * @param props
 * @returns
 */
export declare const Permission: React.FC<PermissionProps>;
/**
 * 高阶组件,有指定权限才渲染
 * @param C
 * @returns
 */
export declare function withPermission<Props extends JSX.IntrinsicAttributes>(C: React.FC<Props>, permissionPath: string): React.FC<Props>;
export {};
