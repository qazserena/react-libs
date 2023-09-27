import React from 'react';
import { User } from '../index';
interface AuthContextType {
    /**
     * 当前用户
     */
    currentUser: User | undefined;
    /**
     * 登录中
     */
    loading: boolean;
    /**
     * 帐号登录
     */
    loginWithAccount: (username: string, password: string, cacheToken: boolean) => Promise<User>;
    /**
     * token登录
     */
    loginWithToken: () => Promise<User>;
    /**
     * 登出
     */
    logout: () => Promise<void>;
}
export declare const AuthContext: React.Context<AuthContextType>;
interface AuthContextProviderProps {
    children: React.ReactNode;
}
export declare const AuthContextProvider: (props: AuthContextProviderProps) => React.JSX.Element;
export {};
