import React from 'react';
import { TableDataProvider, TableSchema } from '../../api';
import { BackgroundTask, TaskData } from '../BackgroundTask';
interface ExportTaskData extends TaskData {
    file: string;
}
export declare class BackgroundExportTask extends BackgroundTask<ExportTaskData> {
    private dataProvider;
    private condition?;
    private timezone?;
    constructor(dataProvider: TableDataProvider, condition?: string | undefined, timezone?: string | undefined);
    private timer;
    private data;
    private jobId;
    onStart(): void;
    getTaskData(): ExportTaskData;
    onFinalize(): void;
    private clearTimer;
    private refresh;
}
interface ExportTaskProps {
    schema: TableSchema;
    task: BackgroundExportTask;
}
export declare const ExportTaskView: (props: ExportTaskProps) => React.JSX.Element;
export {};
