import React from 'react';
interface TimestampRenderProps {
    value?: number;
    unit?: 'millisecond' | 'second';
    precision?: 'date' | 'datetime';
    format?: string;
}
/**
 * 时间戳render
 * @param props
 * @returns
 */
export declare const TimestampRender: React.FC<TimestampRenderProps>;
export {};
