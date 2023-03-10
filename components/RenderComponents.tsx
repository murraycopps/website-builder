import {ComponentNode} from "@/scripts/types";
import {generateClassName} from "@/scripts";

export default function RenderComponents({node}: { node: ComponentNode }) {
    const className = generateClassName(node);

    switch (node.type) {
        case "body":
            return (
                <div className={className}>
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </div>
            );
        case "div":
            return (
                <div className={className}>
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </div>
            );
        case "h1":
            return (
                <h1 className={className}>
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </h1>
            );
        case "h2":
            return (
                <h2 className={className}>
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </h2>
            );
        case "p":
            return (
                <p className={className}>
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </p>
            );
        case "br":
            return <br/>;
        case "button":
            return (
                <button
                    className={`${node.props.className} bg-${node.props.bgClass} text-${
                        node.props.textColor
                    } ${node.props.layoutProps?.display || "block"} 
          ${node.props.layoutProps?.position || "static"}
          ${
                        node.props.layoutProps?.centerChildren
                            ? "place-content-center place-items-center items-center content-center justify-center"
                            : ""
                    }`}
                    onClick={node.props.onClick}
                >
                    {node.children.map((childNode, i) => (
                        <RenderComponents node={childNode} key={i}/>
                    ))}
                </button>
            );
        case "text":
            return <>{node.text}</>;
        default:
            return null;
    }
}
