import { ReactElement } from 'react';
export interface Link {
    id: string;
    active: boolean;
    title: string;
    onClick: () => void;
}
declare type ExpandedThemeValue = {
    title: string;
};
export declare type ThemeValue = string | ExpandedThemeValue;
export declare const Tool: () => ReactElement;
export {};
