type ComponentNode = {
    type: string;
    props: { [key: string]: any };
    children: ComponentNode[];
    index: number;
    text?: string;
};

type LayoutProps = {
    display: string;
    position: string;
    centerChildren: boolean;
    rows?: number;
    columns?: number;
    gap?: number;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

export type { ComponentNode, LayoutProps };