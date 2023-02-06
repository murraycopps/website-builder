import { ComponentNode } from "@/scripts/types";
import { useState, useEffect, useRef, ReactEventHandler } from "react";

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

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const printNode = (node: ComponentNode, spaces: number) => {
      console.log(
        " ".repeat(spaces),
        node.type,
        node.index,
        node.props.className
      );
      node.children.forEach((childNode) => printNode(childNode, spaces + 2));
    };

    const foundNode = findNode(node, index);
    if (!foundNode) return;
    console.log(index);
    printNode(node, 0);
    printNode(foundNode, 0);
    setCurrentNode(foundNode);
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
    if (!newNode) return;

    // console.log(newNode);
    setNode({ ...newNode });
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

  function addChild() {
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
          type: "div",
          index: maxIndex + 1,
          props: {
            className: "",
          },
          children: [],
        },
      ],
    });
    if (!newNode) return;

    setNode({ ...newNode });
    setCurrentNode({
      ...currentNode,
      children: [
        ...currentNode.children,
        {
          type: "div",
          index: maxIndex + 1,
          props: {
            className: "",
          },
          children: [],
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
        },
        children: [],
        text: "",
      });
      setCurrentNode({
        type: "body",
        index: 0,
        props: {
            className: node.props.className,
        },
        children: [],
        text: "",
        });
      return;
    }
    const newNode = deleteChildNode(node, index);
    setNode({ ...newNode });
  }

  return (
    <div className="p-4 grow">
      <h1 className="text-2xl">
        Edit Component
      </h1>
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

        <label htmlFor="text" className="ml-4 mr-2">
          Text
        </label>
        <input
          type="text"
          name="text"
          id="text"
          defaultValue={currentNode.text}
        />

        <button className="p-2 bg-blue-500 rounded-full" type="submit">
          Save
        </button>
        <div className="flex flex-row justify-center gap-8">
          <button
            className="flex-1 p-2 text-white bg-green-500 rounded-full"
            type="submit"
            onClick={addChild}
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
    return { ...node, ...updatedNode };
  }

  for (let i = 0; i < node.children.length; i++) {
    if (node.children[i].index === targetIndex) {
      node.children[i] = { ...node.children[i], ...updatedNode };
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
  return node;
}
