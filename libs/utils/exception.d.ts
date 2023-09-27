/**
 * 业务逻辑错误
 */
export declare class BusinessError {
    code: number;
    message: string;
    constructor(code: number, message: string);
    toString(): string;
}
/**
 * 网络请求错误
 */
export declare class HttpError {
    status: number;
    body: string;
    constructor(status: number, body: string);
    toString(): string;
}
export declare function defaultExceptionHandler(e: any): void;
export declare function createExceptionHandler(handlers: {
    business?: (e: BusinessError) => void;
    http?: (e: HttpError) => void;
}): (e: any) => void;
