import {ComponentNode} from "@/scripts/types";
import {useState, useEffect, useRef} from "react";

export default function EditComponent({
                                          node,
                                          index,
                                          setNode,
                                      }: {
    node: ComponentNode;
    index: number;
    setNode: (node: ComponentNode) => void;
}) {
    const [currentNode, setCurrentNode] = useState<ComponentNode>(
        findNode(node, index)
    );

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setCurrentNode(findNode(node, index));
    }, [index, node]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const type = formData.get("type") as string;
        const className = formData.get("class") as string;

        const text = formData.get("text") as string;


        // console.log("currentNode", currentNode);
        const newNode = updateChildNode(node, index, {
            ...currentNode,
            type,
            props: {
                ...currentNode.props,
                className,
            },
            text,
        });

        // console.log(newNode);
        setNode({...newNode});
        setCurrentNode({
            ...currentNode,
            type,
            props: {
                ...currentNode.props,
                className,
            },
            text,
        });

        const printNode = (node: ComponentNode, spaces: number) => {
            console.log(
                " ".repeat(spaces),
                node.type,
                node.index,
                node.props.className
            );
            node.children.forEach((childNode) => printNode(childNode, spaces + 2));
        };
        // console.log("newNode");
        // printNode(newNode, 0);
        if (formRef.current) formRef.current.reset();
    };

    return (
        <div className="p-4 grow">
            <form
                ref={formRef}
                className="flex flex-col justify-start w-full h-full gap-8"
                onSubmit={handleSubmit}
            >
                <label htmlFor="type" className="mr-2">
                    Type
                </label>
                <input
                    id="type"
                    type="text"
                    name="type"
                    defaultValue={currentNode.type}
                />
                <label id="class" htmlFor="class" className="ml-4 mr-2">
                    Class
                </label>
                <input
                    type="text"
                    name="class"
                    id="class"
                    defaultValue={currentNode.props.className}
                />

                <label htmlFor="text" className="ml-4 mr-2">Text</label>
                <input type="text" name="text" id="text" defaultValue={currentNode.text}/>

                {/* add a add child button */}
                {/* add a remove button */}
                <button className="ml-4"
                        onClick={(e) => {
                            e.preventDefault();
                            const newNode = updateChildNode(node, index, {
                                ...currentNode,
                                children: [
                                    ...currentNode.children,
                                    {
                                        type: "div",
                                        index: currentNode.children.length,
                                        props: {
                                            className: "",
                                        },
                                        children: [],
                                    },
                                ],
                            });
                            setNode({...newNode});
                            setCurrentNode({
                                ...currentNode,
                                children: [
                                    ...currentNode.children,
                                    {
                                        type: "div",
                                        index: currentNode.children.length,
                                        props: {
                                            className: "",
                                        },
                                        children: [],
                                    },
                                ],
                            });
                        }}
                >
                    Add Child
                </button>


                <button className="ml-4" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

const findNode = (node: ComponentNode, index: number): ComponentNode => {
    if (node.index === index) {
        return node;
    }
    for (const childNode of node.children) {
        const foundNode = findNode(childNode, index);
        if (foundNode) {
            return foundNode;
        }
    }
    return node;
};

function updateChildNode(
    node: ComponentNode,
    targetIndex: number,
    updatedNode: ComponentNode
) {
    if (!node || !node.children) {
        return node;
    }
    if (node.index === targetIndex) {
        return {...node, ...updatedNode};
    }

    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].index === targetIndex) {
            node.children[i] = {...node.children[i], ...updatedNode};
            return node;
        }
        const updatedChild = updateChildNode(
            node.children[i],
            targetIndex,
            updatedNode
        );
        if (updatedChild) {
            node.children[i] = updatedChild;
            return node;
        }
    }
    return node;
}
