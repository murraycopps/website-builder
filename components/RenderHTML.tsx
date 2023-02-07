import { ComponentNode } from "@/scripts/types";
import { generateClassName } from "@/scripts";

export default function RenderHTML({ node }: { node: ComponentNode }) {
    const className = generateClassName(node);

  if (node.type === "body") {
    return (
      <div className="p-4 border-gray-800 border-r-8 h-full">
        {"<!DOCTYPE html>"}
        <br />
        <br />
        {"<html lang='en'>"}
        <div className="my-4 ml-4">
          {"<head>"}
          <div className="ml-4">
              {"<meta charset='UTF-8' />"}
                <br />
                {"<meta name='viewport' content='width=device-width, initial-scale=1.0' />"}
                <br />
                {"<title>Document</title>"}
                <br />
            {`<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css" rel="stylesheet" />`}
          </div>
          {"</head>"}
        <br />
          <br />
          {`<body class="${className}">`}
          <div className="ml-4">
            {node.children.map((childNode, i) => (
              <RenderHTML node={childNode} key={i} />
            ))}
          </div>
          {`</body>`}
        </div>
        {"</html>"}
      </div>
    );
  }

  if (node.type === "text") {
    return <div>{node.text}</div>;
  }

  return (
    <div>
      {`<${node.type} class="${className}">`}
      <div className="ml-4">
        {node.children.map((childNode, i) => (
          <RenderHTML node={childNode} key={i} />
        ))}
      </div>
      {`</${node.type}>`}
    </div>
  );
}
