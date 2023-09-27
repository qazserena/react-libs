import React from 'react';
export interface TimestampPickerProps {
    disabled?: boolean;
    allowClear?: boolean;
    /**
     * 单位: 毫秒|秒
     */
    unit?: 'millisecond' | 'second';
    /**
     * 精度: 日期 | 日期+时间
     */
    precision?: 'date' | 'datetime';
    value?: number;
    onChange?: (value: number) => void;
}
/**
 * 时间戳选择器
 * @param props
 * @returns
 */
export declare const TimestampPicker: React.FC<TimestampPickerProps>;
