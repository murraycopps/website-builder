import { ComponentNode } from "@/scripts/types";

export default function RenderHTML({ node }: { node: ComponentNode }) {
  if (node.type === "body") {
    return (
      <div className="p-4 border-gray-800 border-r-8 h-full">
        {"<!DOCTYPE html>"}
        <br />
        <br />
        {"<html>"}
        <div className="my-4 ml-4">
          {"<head>"}
          <div className="ml-4">
            {`<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.0/dist/tailwind.min.css" rel="stylesheet" />`}
          </div>
          {"</head>"}
        <br />
          <br />
          {`<body class="${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}">`}
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
      {`<${node.type} class="${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}">`}
      <div className="ml-4">
        {node.children.map((childNode, i) => (
          <RenderHTML node={childNode} key={i} />
        ))}
      </div>
      {`</${node.type}>`}
    </div>
  );
}
