export declare const decorators: (() => any)[];
export declare const parameters: {
    server: {
        fetchStoryHtml: (url: string, path: string, params: Record<string, unknown>, context: {
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
        }) => Promise<string>;
    };
};
