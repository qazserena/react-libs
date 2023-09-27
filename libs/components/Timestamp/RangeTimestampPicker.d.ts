import React from 'react';
export interface RangeTimestampPickerProps {
    disabled?: boolean;
    allowClear?: boolean;
    /**
     * 是否禁用精度切换
     */
    disablePrecisionSwitch?: boolean;
    /**
     * 单位: 毫秒|秒
     */
    unit?: 'millisecond' | 'second';
    /**
     * 精度: 日期 | 日期+时间
     */
    precision?: 'date' | 'datetime';
    value?: [number, number] | null;
    onChange?: (value: [number, number] | null) => void;
}
/**
 * 时间戳范围选择器
 * @param props
 * @returns
 */
export declare const RangeTimestampPicker: React.FC<RangeTimestampPickerProps>;
