import { ComponentNode } from "@/scripts/types";

export default function RenderComponents({ node }: { node: ComponentNode }) {
  switch (node.type) {
    case "body":
      return (
        <div className={node.props.className}>
          {node.text || ""}
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </div>
      );
    case "div":
      return (
        <div className={node.props.className}>
          {node.text || ""}
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </div>
      );
    case "h1":
      return (
        <h1 className={node.props.className}>
          {node.text || ""}
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </h1>
      );
    case "span":
      return (
        <span className={node.props.className}>
          {node.text || ""}
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </span>
      );
    case "p":
      return (
        <p className={node.props.className}>
          {node.text || ""}
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </p>
      );
    default:
      return null;
  }
}
