import { PermissionTree } from './permission';
import { ApiSetting } from './setting';
export declare const authApi: ApiSetting<{
    loginWithToken: string;
    loginWithAccount: string;
    logout: string;
}>;
/**
 * 用户信息
 */
export interface User {
    uid: number;
    username: string;
    roles: string[];
    token: string;
    tokenExpiredTick: number;
    permissionTree: PermissionTree;
}
/**
 * 使用token登录
 * @param api
 * @returns
 */
export declare function loginWithToken(): Promise<User>;
/**
 * 使用帐号密码登录
 * @param username
 * @param password
 * @param api
 * @returns
 */
export declare function loginWithAccount(username: string, password: string): Promise<User>;
/**
 * 登出
 * @param api
 */
export declare function logout(): Promise<void>;
