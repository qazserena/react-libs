import React from 'react';
import { BackgroundTask } from './BackgroundTask';
interface AddFun {
    <T extends BackgroundTask>(task: T, taskViewRender: (task: T) => React.ReactNode): void;
}
interface BackgroundTaskApi {
    add: AddFun;
}
export declare const backgroundTaskApi: React.RefObject<BackgroundTaskApi>;
interface BackgroundTaskIndicatorProps {
}
/**
 *
 * @param props 后台任务指示器
 * @returns
 */
export declare const BackgroundTaskIndicator: React.FC<BackgroundTaskIndicatorProps>;
export {};
