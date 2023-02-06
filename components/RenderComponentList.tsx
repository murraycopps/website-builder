import { ComponentNode } from "@/scripts/types";
import { useEffect, useState } from "react";

export default function RenderComponentList({
  node,
  index,
  setIndex,
  listRef,
}: {
  node: ComponentNode;
  index: number;
  setIndex: (index: number) => void;
  listRef: React.RefObject<HTMLUListElement>;
}) {
  const [currentNode, setCurrentNode] = useState<ComponentNode>(node);
  const [parentNode, setParentNode] = useState<ComponentNode | null>(null);

  useEffect(() => {
    setCurrentNode(findNode(node, index));
    setParentNode(findParentNode(node, index));
    // console.log("findParentNode", findParentNode(node, index), !!findParentNode(node, index));
  }, [index, node]);

  return (
    <ul className="pl-4" ref={listRef}>
      {/* {parentNode && (
        <li
          key={parentNode.index}
          onClick={() => setIndex(parentNode.index)}
          className="font-bold"
        >
          {parentNode.type}
        </li>
      )} */}

      {/* <li
        key={currentNode.index}
        onClick={() => setIndex(currentNode.index)}
        className="ml-4 font-bold"
      >
        {currentNode.type}
      </li> */}
      <li
        key={node.index}
        onClick={() => setIndex(node.index)}
        className={node.index === index ? "font-bold" : ""}
      >
        {node.type}
      </li>

      {/* {currentNode.children.map((childNode) => (
        <li
          key={childNode.index}
          onClick={() => setIndex(childNode.index)}
          className="ml-8"
        >
          {childNode.type}
        </li>
      ))} */}
{node.children.map((childNode) => (
        <RenderComponentList
            key={childNode.index}
            node={childNode}
            index={index}
            setIndex={setIndex}
            listRef={listRef}
        />
      ))}
      {/* {parentNode &&
        parentNode.children
          .filter((childNode) => childNode.index !== index)
          .map((childNode) => (
            <li
              key={childNode.index}
              onClick={() => setIndex(childNode.index)}
              className="ml-4 font-bold"
            >
              {childNode.type}
            </li>
          ))} */}
    </ul>
  );
}

const findNode = (node: ComponentNode, index: number): ComponentNode => {
  if (node.index === index) {
    return node;
  }

  for (let i = 0; i < node.children.length; i++) {
    const childNode = node.children[i];
    const foundNode = findNode(childNode, index);
    if (foundNode) {
      return foundNode;
    }
  }
  return node;
};

const findParentNode = (
  node: ComponentNode,
  index: number
): ComponentNode | null => {
  if (node.index === index) {
    return null;
  }
  let parentNode = null;

  const traverse = (currentNode: ComponentNode) => {
    if (currentNode.children.length) {
      currentNode.children.forEach((childNode) => {
        if (childNode.index === index) {
          parentNode = currentNode;
        } else {
          traverse(childNode);
        }
      });
    }
  };

  traverse(node);

  return parentNode;
};
