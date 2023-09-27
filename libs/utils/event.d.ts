export declare class EventEmitter {
    private listeners;
    on(event: string, callback: Function, callbackTarget?: Object): void;
    once(event: string, callback: Function, callbackTarget?: Object): void;
    private appendItem;
    off(event: string, callback: Function): void;
    emit(event: string, ...args: any[]): void;
}
