import { ComponentNode } from "@/scripts/types";

export default function RenderHTML({ node }: { node: ComponentNode }) {
    const className = `
    ${node.props.className}
    bg-${node.props.bgClass}
    text-${node.props.textColor}
    ${node.props.layoutProps?.display || "block"} 
    ${node.props.layoutProps?.position || "static"}
    ${
        node.props.layoutProps?.centerChildren
            ? "place-content-center place-items-center items-center content-center justify-center"
            : ""
    }
    ${
        node.props.layoutProps?.display?.includes("grid")
            ? `grid-rows-${node.props.layoutProps?.rows === 0 ? 'none' : node.props.layoutProps?.rows}  grid-cols-${node.props.layoutProps?.columns === 0 ? 'none' : node.props.layoutProps?.columns}`
            : ""
    }
    `;

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
