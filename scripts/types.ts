type ComponentNode = {
    type: string;
    props: { [key: string]: any };
    children: ComponentNode[];
    index: number;
    text?: string;
};

export type { ComponentNode };