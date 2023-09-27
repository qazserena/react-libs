import React from 'react';
import { User } from '../../index';
export interface LoginProps {
    /**
     * 登录成功回调
     */
    onLoginSuccess: (user: User) => void;
}
/**
 * 登录组件
 * @param props
 * @returns
 */
declare const Login: React.FC<LoginProps>;
export { Login };
