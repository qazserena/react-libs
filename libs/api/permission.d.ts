import { ApiSetting } from './setting';
export declare const permissionApi: ApiSetting<{
    loadPermissionData: string;
}>;
export interface PermissionData {
    code: string;
    name: string;
    children: Record<string, PermissionData>;
}
export interface PermissionTree {
    code: string;
    wildcard: boolean;
    children: Record<string, PermissionTree>;
}
export declare function loadPermissionData(): Promise<PermissionData>;
