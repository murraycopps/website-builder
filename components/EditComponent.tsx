import {ComponentNode, LayoutProps} from "@/scripts/types";
import {useState, useEffect, useRef} from "react";
import AddChildCard from "./AddChildCard";
import ColorCard from "@/components/ColorCard";
import LayoutCard from "./LayoutCard";

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
        findNode(node, index) || node
    );
    const [showChild, setShowChild] = useState(false);
    const [bgColor, setBgColor] = useState<string>("");
    const [changeBgColor, setChangeBgColor] = useState(false);
    const [textColor, setTextColor] = useState("");
    const [changeTextColor, setChangeTextColor] = useState(false);
    const [layoutProps, setLayoutProps] = useState<LayoutProps>({
        display: "block",
        position: "static",
        centerChildren: false,
    });
    const [changelayoutProps, setChangelayoutProps] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const printNode = (node: ComponentNode, spaces: number) => {
            console.log(
                " ".repeat(spaces),
                node.type,
                node.index,
                node.props.className,
                node.text,
                node.props.bgClass,
                node.props.textColor,
                node.props.layoutProps
            );
            node.children.forEach((childNode) => printNode(childNode, spaces + 2));
        };

        const foundNode = findNode(node, index);
        if (!foundNode) return;

        console.log(index);

        printNode(node, 0);
        printNode(foundNode, 0);
        setCurrentNode(foundNode);

        const bgColor = foundNode.props.bgClass;
        if (bgColor) {
            setBgColor(bgColor);
        } else {
            setBgColor("");
            foundNode.props.bgColor = "";
        }

        const textColor = foundNode.props.textColor;
        if (textColor) {
            setTextColor(textColor);
        } else {
            setTextColor("");
            foundNode.props.textColor = "";
        }

        const layoutProps = foundNode.props.layoutProps;
        if (layoutProps) {
            setLayoutProps(layoutProps);
        } else {
            setLayoutProps({
                display: "block",
                position: "static",
                centerChildren: false,
            });
            foundNode.props.layoutProps = [];
        }
    }, [index, node]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const type = formData.get("type") as string;
        const className = formData.get("class") as string;

        const text = (formData.get("text") as string) || "";

        if (!type || className === null) return;

        const newNode = updateChildNode(node, index, {
            ...currentNode,
            type,
            props: {
                ...currentNode.props,
                className,
                bgClass: bgColor,
                textColor,
                layoutProps,
            },
            text,
        });
        if (!newNode) return;

        // console.log(newNode);
        setNode({...newNode});
        setCurrentNode({
            ...currentNode,
            type,
            props: {
                ...currentNode.props,
                className,
                bgClass: bgColor,
                textColor,
                layoutProps,
            },
            text,
        });

        // console.log("newNode");
        // printNode(newNode, 0);
        if (formRef.current) formRef.current.reset();
    };

    function addChild(type: string) {
        setShowChild(false);
        if (currentNode.type === "text") return;
        const findMaxIndex = (node: ComponentNode): number => {
            let maxIndex = node.index;
            node.children.forEach((childNode) => {
                const childMaxIndex = findMaxIndex(childNode);
                if (childMaxIndex > maxIndex) maxIndex = childMaxIndex;
            });
            return maxIndex;
        };
        const maxIndex = findMaxIndex(node);
        const newNode = updateChildNode(node, index, {
            ...currentNode,
            children: [
                ...currentNode.children,
                {
                    type,
                    index: maxIndex + 1,
                    props: {
                        className: "",
                        bgClass: "bg-transparent",
                        textColor: "",
                        layoutProps: {},
                    },
                    children: [],
                    text: "",
                },
            ],
        });
        if (!newNode) return;

        setNode({...newNode});
        setCurrentNode({
            ...currentNode,
            children: [
                ...currentNode.children,
                {
                    type: "div",
                    index: maxIndex + 1,
                    props: {
                        className: "",
                        bgClass: "bg-transparent",
                        textColor: "",
                        layoutProps: {},
                    },
                    children: [],
                    text: "",
                },
            ],
        });
    }

    function deleteCurrentNode() {
        // if node is root node delete all children
        if (currentNode.index === 0) {
            setNode({
                type: "body",
                index: 0,
                props: {
                    className: node.props.className,
                    bgClass: node.props.bgClass,
                    textColor: node.props.textColor,
                    layoutProps: node.props.layoutProps,
                },
                children: [],
            });
            setCurrentNode({
                type: "body",
                index: 0,
                props: {
                    className: node.props.className,
                    bgClass: node.props.bgClass,
                    textColor: node.props.textColor,
                    layoutProps: node.props.layoutProps,
                },
                children: [],
            });
            return;
        }
        const newNode = deleteChildNode(node, index);

        if (!newNode) return;

        setNode({...newNode});
    }

    useEffect(() => {
        setChangeBgColor(false);
    }, [bgColor]);

    useEffect(() => {
        setChangeTextColor(false);
    }, [textColor]);

    useEffect(() => {
        setChangelayoutProps(false);
    }, [layoutProps]);

    return (
        <div className="relative p-4 grow">
            <h1 className="text-2xl">Edit Component</h1>
            <form
                ref={formRef}
                className="flex flex-col justify-start w-full h-full gap-8"
                onSubmit={handleSubmit}
            >
                {!changeBgColor && !changeTextColor && !changelayoutProps && (
                    <>
                        <label htmlFor="type" className="mr-2">
                            Type
                        </label>
                        <input
                            id="type"
                            type="text"
                            name="type"
                            defaultValue={currentNode.type}
                        />

                        {currentNode.type === "text" ? (
                            <>
                                <label htmlFor="text" className="ml-4 mr-2">
                                    Text
                                </label>
                                <input
                                    type="text"
                                    name="text"
                                    id="text"
                                    defaultValue={currentNode.text}
                                />
                            </>
                        ) : (
                            <>
                                <label id="class" htmlFor="class" className="ml-4 mr-2">
                                    Class
                                </label>
                                <input
                                    type="text"
                                    name="class"
                                    id="class"
                                    defaultValue={currentNode.props.className}
                                />
                            </>
                        )}
                        {currentNode.type !== "text" && (
                            <>
                                {/* button to set change layout */}
                                <button
                                    className="p-2 bg-blue-500 rounded-full"
                                    type="button"
                                    onClick={() => setChangelayoutProps(true)}
                                >
                                    Change Layout
                                </button>

                                <div className="flex flex-row justify-center gap-8">
                                    <button
                                        className="flex-1 p-2 text-white bg-yellow-500 rounded-full"
                                        type="button"
                                        onClick={() => setChangeBgColor(true)}
                                    >
                                        Change Background
                                    </button>
                                    <button
                                        className="flex-1 p-2 text-white bg-yellow-500 rounded-full"
                                        type="button"
                                        onClick={() => setChangeTextColor(true)}
                                    >
                                        Change Text Color
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}

                {changeBgColor && <ColorCard setColor={setBgColor}/>}

                {changeTextColor && <ColorCard setColor={setTextColor}/>}

                {changelayoutProps && (
                    <LayoutCard
                        body={currentNode.type === "body"}
                        layoutProps={layoutProps}
                        setLayoutProps={setLayoutProps}
                    />
                )}

                <button className="p-2 bg-blue-500 rounded-full" type="submit">
                    Save
                </button>
                <div className="flex flex-row justify-center gap-8">
                    <button
                        className="flex-1 p-2 text-white bg-green-500 rounded-full"
                        type="submit"
                        onClick={() => setShowChild(true)}
                    >
                        Add Child
                    </button>
                    <button
                        className="flex-1 p-2 text-white bg-red-500 rounded-full"
                        type="submit"
                        onClick={deleteCurrentNode}
                    >
                        Delete
                    </button>
                </div>
            </form>
            {showChild && (
                <div className="absolute inset-0 flex flex-col justify-center w-full h-full gap-8 bg-gray-50">
                    <h1 className="text-2xl">Add Child</h1>
                    <AddChildCard addChild={addChild}/>
                </div>
            )}
        </div>
    );
}

const findNode = (node: ComponentNode, index: number): ComponentNode | null => {
    if (node.index === index) {
        console.log("found", node.index, index);
        return node;
    }
    console.log(node.children);
    for (const childNode of node.children) {
        const foundNode = findNode(childNode, index);
        console.log("foundNode", foundNode, !!foundNode);
        if (foundNode) {
            return foundNode;
        }
    }
    console.log("not found", node.index, index);
    return null;
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
    return null;
}

function deleteChildNode(node: ComponentNode, targetIndex: number) {
    if (!node || !node.children) {
        return node;
    }
    if (node.index === targetIndex) {
        return node;
    }

    for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].index === targetIndex) {
            node.children.splice(i, 1);
            return node;
        }
        const updatedChild = deleteChildNode(node.children[i], targetIndex);
        if (updatedChild) {
            node.children[i] = updatedChild;
            return node;
        }
    }
    return null;
}

const printNode = (node: ComponentNode, spaces: number) => {
    console.log(
        " ".repeat(spaces),
        node.type,
        node.index,
        node.props.className,
        node.text,
        node.props.bgClass,
        node.props.textClass,
        node.props.layoutProps
    );
    node.children.forEach((childNode) => printNode(childNode, spaces + 2));
};
