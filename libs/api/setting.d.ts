/**
 * api配置
 */
export declare class ApiSetting<T extends Object> {
    private key;
    private _data;
    get data(): T;
    constructor(key: string, defaultValue: T);
    setup(value: T): void;
}
