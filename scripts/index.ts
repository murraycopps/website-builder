import {ComponentNode} from "@/scripts/types";

const generateClassName = (node: ComponentNode) => (
    `
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
    ${
        node.props.layoutProps?.fullWidth ? "w-full" : "w-auto"
    }
    ${
        node.props.layoutProps?.fullHeight ? "h-full" : "h-auto"
    }
    ${
        node.props.layoutProps?.gap ? `gap-${node.props.layoutProps?.gap * 4 || 0}` : ""
    }
    `
)


export {generateClassName}