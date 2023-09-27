import React from 'react';
import { TableDataProvider } from '../../index';
import { TableSchema } from '../../api';
interface ExportButtonProps {
    schema: TableSchema;
    dataProvider: TableDataProvider;
    condition?: string;
}
export declare const ExportButton: (props: ExportButtonProps) => React.JSX.Element;
export {};
