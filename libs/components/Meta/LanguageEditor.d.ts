import React from 'react';
import { LanguageItem } from '../../api/language';
interface LanguageEditorProps {
    /**
     * 本地语言项
     */
    localLanguages?: LanguageItem[];
    /**
     * 表格列中默认显示的语言
     */
    defaultLanguage?: string;
    /**
     * 禁用自动加载枚举多语言
     */
    disableEnumLanguage?: boolean;
}
/**
 * 多语言编辑器
 *
 * 数据来源
 * 1. 本地配置文件
 * 2. 枚举自动填充
 * 3. 从服务器读取
 *
 * @returns
 */
export declare const LanguageEditor: (props: LanguageEditorProps) => React.JSX.Element;
export {};
