/**
 * 存放在Local Storage中的缓存数据
 */
export declare class StorageItem<T> {
    private _data;
    private _initFromStorage;
    private key;
    constructor(key: string);
    get data(): T | null;
    set data(value: T | null);
}
