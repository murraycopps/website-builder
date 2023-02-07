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
}

export type { ComponentNode, LayoutProps };