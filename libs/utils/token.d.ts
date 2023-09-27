export declare function setApiToken(token: string, cacheIt?: boolean): void;
export declare function getApiToken(): string | null;
/**
 * 设置token过期的处理函数
 */
export declare function setTokenExpireHandler(handler: () => void): void;
