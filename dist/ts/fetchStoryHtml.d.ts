declare type StorybookContext = {
    globals: {
        drupalTheme?: string;
    };
    args: Record<string, unknown>;
    parameters: {
        options: {
            variant: string;
        };
        fileName: string;
        drupalTheme?: string;
        supportedDrupalThemes?: Record<string, {
            title: string;
        }>;
    };
};
declare const fetchStoryHtml: (url: string, path: string, params: Record<string, unknown>, context: StorybookContext) => Promise<string>;
export default fetchStoryHtml;
