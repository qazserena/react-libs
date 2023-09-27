import { RESTfulApi } from '../utils';
export interface LanguageItem {
    langKey: string;
    [lang: string]: string;
}
export declare class LanguageApi extends RESTfulApi<LanguageItem> {
    constructor();
    query(lang: string): Promise<LanguageItem[]>;
    getSupporedLanguages(): Promise<string[]>;
}
