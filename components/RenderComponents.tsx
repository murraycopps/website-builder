import { ComponentNode } from "@/scripts/types";

export default function RenderComponents({ node }: { node: ComponentNode }) {
  switch (node.type) {
    case "body":
      return (
        <div className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </div>
      );
    case "div":
      return (
        <div className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </div>
      );
    case "h1":
      return (
        <h1 className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </h1>
      );
    case "h2":
      return (
        <h2 className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </h2>
      );
    case "p":
      return (
        <p className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </p>
      );
    case "br":
      return <br />;
    case "button":
      return (
        <button className={`${node.props.className} bg-${node.props.bgClass} text-${node.props.textColor}`} onClick={node.props.onClick}>
          {node.children.map((childNode, i) => (
            <RenderComponents node={childNode} key={i} />
          ))}
        </button>
      );
      case "text":
        return <>{node.text}</>
    default:
      return null;
  }
}
