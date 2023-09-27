import { ApiSetting } from './setting';
export interface MetaEnumItem {
    code: string;
    value: number;
    label: string;
}
export interface MetaEnum {
    code: string;
    label: string;
    editable: boolean;
    items: MetaEnumItem[];
}
export declare const metaApi: ApiSetting<{
    enumRest: string;
    languageRest: string;
}>;
