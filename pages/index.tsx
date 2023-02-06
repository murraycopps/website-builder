import EditComponent from "@/components/EditComponent";
import RenderComponentList from "@/components/RenderComponentList";
import RenderComponents from "@/components/RenderComponents";
import { ComponentNode } from "@/scripts/types";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

export default function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [componentNode, setComponentNode] = useState<ComponentNode>({
    type: "body",
    props: {
      className: "body bg-gray-800 w-full h-full",
    },
    children: [
      {
        type: "div",
        props: {
          className: "w-full h-full",
        },
        children: [
          {
            type: "h1",
            props: {
              className: "text-4xl text-white",
            },
            children: [
              {
                type: "p",
                props: {
                  className: "text",
                },
                children: [],
                index: 3,
                text: "Hello World",
              },
              {
                type: "div",
                props: {
                  className: "text",
                },
                children: [],
                index: 4,
                text: "Hello World",
              }
            ],
            index: 2,
          },
        ],
        index: 1,
      },
    ],
    index: 0,
  });

  const [currentNode, setCurrentNode] = useState<ComponentNode>(componentNode);

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const printNode = (node: ComponentNode, spaces: number) => {
      console.log(" ".repeat(spaces), node.type, node.index, node.props.className);
      node.children.forEach((childNode) => printNode(childNode, spaces + 2));
    }
    
    // console.log("componentNode");
    
    // printNode(componentNode, 0)

    setCurrentNode(findNode(componentNode, currentIndex));
  }, [currentIndex, componentNode]);

  return (
    <div className="grid w-screen h-screen grid-cols-2">
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="">
        <RenderComponents node={componentNode} />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <RenderComponentList
          node={componentNode}
          index={currentIndex}
          setIndex={setCurrentIndex}
          listRef={listRef}
        />
        <EditComponent
          node={componentNode}
          index={currentIndex}
          setNode={setComponentNode}
        />
      </div>
    </div>
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
