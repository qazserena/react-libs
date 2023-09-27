import React from 'react';
import { MetaEnum } from '../api/meta';
interface MetaContextType {
    getEnum: (name: string) => MetaEnum | undefined;
    reload: () => Promise<void>;
    timezone?: string;
    setTimezone: (timezone: string) => void;
    timezoneSupported: boolean;
}
export declare const MetaContext: React.Context<MetaContextType>;
interface MetaContextProviderProps {
    children: React.ReactNode;
}
export declare const MetaContextProvider: (props: MetaContextProviderProps) => React.JSX.Element;
export {};
