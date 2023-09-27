import { EventEmitter } from '../../utils/event';
export interface TaskData {
    finish: boolean;
    progress: number;
}
/**
 * 在后台执行的任务
 * 此处的后台实指不依赖界面渲染而执行的逻辑
 */
export declare abstract class BackgroundTask<T extends TaskData = TaskData> extends EventEmitter {
    constructor();
    /**
     * 任务开始
     */
    abstract onStart(): void;
    /**
     * 任务销毁
     */
    abstract onFinalize(): void;
    /**
     * 获取任务数据
     */
    abstract getTaskData(): T;
    protected setFinish(): void;
}
