import React from 'react';
import { UploadProps as AntdUploadProps } from 'antd';
export type UploadProps = Omit<AntdUploadProps, 'fileList' | 'onChange'> & {
    value?: string | string[];
    maxCount: number;
    onChange?: (value: string | string[]) => void;
};
export declare const Upload: (props: UploadProps) => React.JSX.Element;
