import React from 'react';
import { SelectProps } from 'antd';
export interface EnumSelectProps extends SelectProps {
    /**
     * 枚举名
     */
    enumName: string;
}
/**
 * 枚举选择组件
 * @param props
 * @returns
 */
export declare const EnumSelect: (props: EnumSelectProps) => React.JSX.Element;
