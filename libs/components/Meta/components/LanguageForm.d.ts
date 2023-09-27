import React from 'react';
import { LanguageItem } from '../../../api/language';
interface LanguageFormProps {
    supportedLanguages: string[];
    value?: LanguageItem;
    onFinish: (data: LanguageItem) => Promise<void>;
}
export declare const LanguageForm: (props: LanguageFormProps) => React.JSX.Element;
export {};
